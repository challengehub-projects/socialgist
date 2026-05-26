import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../configs/supbase";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Messages() {
  const location = useLocation();
  const navigate = useNavigate();

  const openUserId = new URLSearchParams(
    location.search
  ).get("user");

  const messagesEndRef = useRef(null);
  const realtimeRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const [me, setMe] = useState(null);

  const [chats, setChats] = useState([]);

  const [activeChat, setActiveChat] =
    useState(null);

  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");

  const [typingUsers, setTypingUsers] =
    useState([]);

  const [sending, setSending] =
    useState(false);

  /* ---------------- AUTO SCROLL ---------------- */

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  /* ---------------- GET USER ---------------- */

  useEffect(() => {
    const initUser = async () => {
      const { data } =
        await supabase.auth.getUser();

      setMe(data?.user || null);
    };

    initUser();
  }, []);

  /* ---------------- SIGN OUT ---------------- */

  const signOut = async () => {
    await supabase.auth.signOut();

    navigate("/login");
  };

  /* ---------------- LOAD CHATS ---------------- */

  const loadChats = async (userId) => {
    const { data, error } = await supabase
      .from("conversation_members")
      .select(`
        conversation_id,
        conversations (
          id
        )
      `)
      .eq("user_id", userId);

    if (error) {
      console.log(error);
      return;
    }

    const formatted = await Promise.all(
      data.map(async (item) => {
        const convo = item.conversations;

        const { data: lastMsg } =
          await supabase
            .from("messages")
            .select("*")
            .eq(
              "conversation_id",
              convo.id
            )
            .order("created_at", {
              ascending: false,
            })
            .limit(1)
            .maybeSingle();

        return {
          conversation_id: convo.id,
          name: "Chat",
          lastMessage:
            lastMsg?.content || "",
          unread: 0,
        };
      })
    );

    setChats(formatted);
  };

  /* ---------------- LOAD MESSAGES ---------------- */

  const loadMessages = async (
    conversationId
  ) => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq(
        "conversation_id",
        conversationId
      )
      .order("created_at", {
        ascending: true,
      });

    setMessages(data || []);
  };

  /* ---------------- INIT ---------------- */

  useEffect(() => {
    if (me?.id) {
      loadChats(me.id);
    }
  }, [me]);

  /* ---------------- OPEN FROM FEED ---------------- */

  useEffect(() => {
    const init = async () => {
      if (!openUserId || !me) return;

      const { data } = await supabase
        .from("conversation_members")
        .select("conversation_id")
        .eq("user_id", me.id)
        .maybeSingle();

      const convoId =
        data?.conversation_id;

      if (!convoId) return;

      const chat = {
        user_id: openUserId,
        conversation_id: convoId,
        name: "User",
      };

      setActiveChat(chat);

      loadMessages(convoId);
    };

    init();
  }, [openUserId, me]);

  /* ---------------- OPEN CHAT ---------------- */

  const openChat = async (chat) => {
    setActiveChat(chat);

    setChats((prev) =>
      prev.map((c) =>
        c.conversation_id ===
        chat.conversation_id
          ? {
              ...c,
              unread: 0,
            }
          : c
      )
    );

    await loadMessages(
      chat.conversation_id
    );
  };

  /* ---------------- REALTIME ---------------- */

  useEffect(() => {
    if (
      !activeChat?.conversation_id ||
      !me
    )
      return;

    const conversationId =
      activeChat.conversation_id;

    const channel = supabase.channel(
      `chat-${conversationId}`
    );

    /* NEW MESSAGE */

    channel.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        const msg = payload.new;

        setMessages((prev) => {
          const exists = prev.some(
            (m) => m.id === msg.id
          );

          if (exists) return prev;

          return [...prev, msg];
        });

        setChats((prev) =>
          prev.map((chat) => {
            if (
              chat.conversation_id ===
              msg.conversation_id
            ) {
              return {
                ...chat,
                lastMessage:
                  msg.content,
              };
            }

            return chat;
          })
        );
      }
    );

    /* TYPING */

    channel.on(
      "broadcast",
      {
        event: "typing",
      },
      ({ payload }) => {
        if (
          payload.userId === me.id
        )
          return;

        setTypingUsers([
          payload.userId,
        ]);

        clearTimeout(
          typingTimeoutRef.current
        );

        typingTimeoutRef.current =
          setTimeout(() => {
            setTypingUsers([]);
          }, 1500);
      }
    );

    channel.subscribe();

    realtimeRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeChat, me]);

  /* ---------------- SEND TYPING ---------------- */

  const sendTyping = async () => {
    if (!realtimeRef.current)
      return;

    realtimeRef.current.send({
      type: "broadcast",
      event: "typing",
      payload: {
        userId: me.id,
        conversationId:
          activeChat.conversation_id,
      },
    });
  };

  /* ---------------- SEND ---------------- */

  const send = async () => {
    if (!text.trim()) return;

    if (sending) return;

    setSending(true);

    const tempId =
      crypto.randomUUID();

    const optimisticMessage = {
      id: tempId,
      sender_id: me.id,
      content: text,
      pending: true,
      conversation_id:
        activeChat.conversation_id,
    };

    /* INSTANT PUSH */

    setMessages((prev) => [
      ...prev,
      optimisticMessage,
    ]);

    setChats((prev) =>
      prev.map((chat) => {
        if (
          chat.conversation_id ===
          activeChat.conversation_id
        ) {
          return {
            ...chat,
            lastMessage: text,
          };
        }

        return chat;
      })
    );

    const messageText = text;

    setText("");

    const { data, error } =
      await supabase
        .from("messages")
        .insert({
          conversation_id:
            activeChat.conversation_id,
          sender_id: me.id,
          content: messageText,
        })
        .select()
        .single();

    if (!error && data) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? data
            : msg
        )
      );
    }

    setSending(false);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="flex h-screen bg-gray-100">

      {/* LEFT */}

      <div className="w-1/3 bg-white border-r flex flex-col">

        <div className="p-4 border-b flex justify-between items-center">

          <h2 className="font-bold text-lg">
            Chats
          </h2>

          <button
            onClick={signOut}
            className="bg-red-500 text-white text-xs px-3 py-1 rounded-lg"
          >
            Sign out
          </button>

        </div>

        <div className="flex-1 overflow-y-auto">

          {chats.map((chat) => (
            <div
              key={
                chat.conversation_id
              }
              onClick={() =>
                openChat(chat)
              }
              className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                activeChat?.conversation_id ===
                chat.conversation_id
                  ? "bg-gray-100"
                  : ""
              }`}
            >
              <div className="flex justify-between items-center">

                <div>

                  <div className="font-semibold">
                    {chat.name}
                  </div>

                  <div className="text-sm text-gray-500 truncate">
                    {chat.lastMessage}
                  </div>

                </div>

                {chat.unread > 0 && (
                  <div className="bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* RIGHT */}

      <div className="flex-1 flex flex-col">

        {!activeChat ? (
          <div className="m-auto text-gray-400">
            Select a chat
          </div>
        ) : (
          <>

            {/* HEADER */}

            <div className="bg-white border-b p-4 flex items-center gap-3">

              <ArrowLeft
                className="cursor-pointer"
                onClick={() =>
                  setActiveChat(null)
                }
              />

              <div>

                <div className="font-bold">
                  {activeChat.name}
                </div>

                <div className="text-xs text-green-500">
                  online
                </div>

              </div>
            </div>

            {/* MESSAGES */}

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-gray-50">

              {messages.map((m) => {
                const isMe =
                  m.sender_id ===
                  me?.id;

                return (
                  <div
                    key={m.id}
                    className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                      isMe
                        ? "bg-purple-600 text-white self-end rounded-br-sm"
                        : "bg-white self-start rounded-bl-sm"
                    }`}
                  >

                    <div>
                      {m.content}
                    </div>

                    {m.pending && (
                      <div className="text-[10px] opacity-70 mt-1">
                        Sending...
                      </div>
                    )}

                  </div>
                );
              })}

              {/* TYPING */}

              {typingUsers.length >
                0 && (
                <div className="text-xs text-gray-500 italic px-2">
                  typing...
                </div>
              )}

              <div
                ref={messagesEndRef}
              />

            </div>

            {/* INPUT */}

            <div className="bg-white border-t p-3 flex gap-2">

              <input
                value={text}
                onChange={(e) => {
                  setText(
                    e.target.value
                  );

                  sendTyping();
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter"
                  ) {
                    send();
                  }
                }}
                className="flex-1 border rounded-full px-4 py-2 outline-none"
                placeholder="Type a message..."
              />

              <button
                disabled={sending}
                onClick={send}
                className="bg-purple-600 text-white px-5 rounded-full disabled:opacity-50"
              >
                Send
              </button>

            </div>

          </>
        )}
      </div>
    </div>
  );
}