import React, { useEffect, useState } from "react";
import { supabase } from "../configs/supbase";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Share2 } from "lucide-react";

/* COLORS */
const textBgColors = [
  "bg-purple-100",
  "bg-blue-100",
  "bg-pink-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-orange-100",
];

const randomFrom = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

export default function Feed() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return setLoading(false);

    const { data: userData } = await supabase.auth.getUser();
    const me = userData?.user;

    const enriched = await Promise.all(
      (data || []).map(async (p) => {
        const { count } = await supabase
          .from("likes")
          .select("*", { count: "exact", head: true })
          .eq("post_id", p.id);

        const { data: liked } = await supabase
          .from("likes")
          .select("*")
          .eq("post_id", p.id)
          .eq("user_id", me?.id)
          .maybeSingle();

        return {
          ...p,
          likesCount: count || 0,
          likedByMe: !!liked,
          bg: randomFrom(textBgColors),

          // SAFE fallback
          username: p.profile_name || "Anonymous User",
        };
      })
    );

    setPosts(enriched);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const likePost = async (post) => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) return;

    if (post.likedByMe) {
      await supabase
        .from("likes")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", user.id);

      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id
            ? { ...p, likedByMe: false, likesCount: p.likesCount - 1 }
            : p
        )
      );
    } else {
      await supabase.from("likes").insert({
        post_id: post.id,
        user_id: user.id,
      });

      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id
            ? { ...p, likedByMe: true, likesCount: p.likesCount + 1 }
            : p
        )
      );
    }
  };

  const commentPost = async (post) => {
    const text = prompt("Write comment");
    if (!text) return;

    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) return;

    await supabase.from("comments").insert({
      post_id: post.id,
      user_id: user.id,
      content: text,
    });

    alert("Comment added");
  };

  const messageUser = (post) => {
    if (!post?.user_id) return;

    navigate(`/messages?user=${post.user_id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-xl mx-auto space-y-4">

        {loading && <p>Loading...</p>}

        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-2xl border">

            {/* USER */}
            <div className="flex items-center gap-3 mb-3">

              <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                {(post.username || "U").charAt(0)}
              </div>

              <div>
                <button
                  onClick={() => messageUser(post)}
                  className="font-semibold hover:underline"
                >
                  {post.username}
                </button>

                <p className="text-xs text-gray-400">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>

            </div>

            {/* CONTENT */}
            <div className={`p-4 rounded-xl ${post.bg}`}>
              {post.content}
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between mt-3 text-sm">

              <button
                onClick={() => likePost(post)}
                className="flex items-center gap-1"
              >
                <Heart className="h-4 w-4" />
                {post.likesCount}
              </button>

              <button
                onClick={() => commentPost(post)}
                className="flex items-center gap-1"
              >
                <MessageCircle className="h-4 w-4" />
                Comment
              </button>

              <button
                onClick={() => messageUser(post)}
                className="flex items-center gap-1"
              >
                <MessageCircle className="h-4 w-4" />
                Message
              </button>

              <button className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}