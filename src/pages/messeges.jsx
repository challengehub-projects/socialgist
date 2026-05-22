import React, { useState } from "react";
import {
  Search,
  Phone,
  Video,
  MoreVertical,
  Send,
  ArrowLeft,
} from "lucide-react";

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");

  const chats = [
    {
      id: 1,
      name: "Tariq Ibrahim",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Bro did you submit the assignment?",
      online: true,
      unread: 2,
    },
    {
      id: 2,
      name: "Anonymous Crush",
      avatar: "https://i.pravatar.cc/150?img=5",
      lastMessage: "I saw you today 👀",
      online: false,
      unread: 0,
    },
    {
      id: 3,
      name: "Study Group",
      avatar: "https://i.pravatar.cc/150?img=8",
      lastMessage: "Exam postponed to Monday",
      online: true,
      unread: 5,
    },
  ];

  const [messages, setMessages] = useState({
    1: [
      { sender: "them", text: "Bro did you submit the assignment?" },
      { sender: "me", text: "Yeah I did it last night" },
    ],
    2: [
      { sender: "them", text: "I saw you today 👀" },
    ],
    3: [
      { sender: "them", text: "Exam postponed to Monday" },
    ],
  });

  const sendMessage = () => {
    if (!message.trim() || !activeChat) return;

    setMessages((prev) => ({
      ...prev,
      [activeChat.id]: [
        ...(prev[activeChat.id] || []),
        { sender: "me", text: message },
      ],
    }));

    setMessage("");
  };

  return (
    <div className="h-screen flex bg-gray-100">

      {/* ================= CHAT LIST ================= */}
      <div className={`w-full md:w-1/3 bg-white border-r overflow-y-auto ${activeChat ? "hidden md:block" : ""}`}>

        {/* HEADER */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Messages</h2>

          <div className="mt-3 flex items-center bg-gray-100 px-3 py-2 rounded-xl">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              placeholder="Search chats..."
              className="bg-transparent ml-2 outline-none text-sm w-full"
            />
          </div>
        </div>

        {/* CHAT LIST */}
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChat(chat)}
            className="flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer"
          >

            <div className="relative">
              <img
                src={chat.avatar}
                className="h-12 w-12 rounded-full"
              />

              {chat.online && (
                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>

            <div className="flex-1">
              <h4 className="font-semibold text-sm">{chat.name}</h4>
              <p className="text-xs text-gray-500 truncate">
                {chat.lastMessage}
              </p>
            </div>

            {chat.unread > 0 && (
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                {chat.unread}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ================= CHAT WINDOW ================= */}
      <div className={`flex-1 flex flex-col ${!activeChat ? "hidden md:flex" : ""}`}>

        {/* TOP BAR */}
        {activeChat && (
          <div className="flex items-center justify-between p-4 bg-white border-b">

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveChat(null)}
                className="md:hidden"
              >
                <ArrowLeft />
              </button>

              <img
                src={activeChat.avatar}
                className="h-10 w-10 rounded-full"
              />

              <div>
                <h4 className="font-semibold text-sm">
                  {activeChat.name}
                </h4>
                <p className="text-xs text-green-500">
                  Online
                </p>
              </div>
            </div>

            <div className="flex gap-3 text-gray-500">
              <Phone className="h-5 w-5 cursor-pointer" />
              <Video className="h-5 w-5 cursor-pointer" />
              <MoreVertical className="h-5 w-5 cursor-pointer" />
            </div>
          </div>
        )}

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">

          {activeChat ? (
            messages[activeChat.id]?.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "me"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-xs ${
                    msg.sender === "me"
                      ? "bg-purple-600 text-white"
                      : "bg-white border"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a chat to start messaging
            </div>
          )}
        </div>

        {/* INPUT */}
        {activeChat && (
          <div className="p-3 bg-white border-t flex gap-2">

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-purple-600 text-white px-4 rounded-xl flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}