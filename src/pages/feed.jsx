import React, { useEffect, useState } from "react";
import {
  Image,
  Smile,
  Send,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Share2,
  CheckCircle2,
  X,
} from "lucide-react";

export default function PostFeedStream() {
  const [activeTab, setActiveTab] = useState("all");
  const [likedPosts, setLikedPosts] = useState({});
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState({});
  const [activePost, setActivePost] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const campusPosts = [
    {
      id: 1,
      author: "Tariq Ibrahim",
      major: "CS • Senior",
      avatar: "https://i.pravatar.cc/150?img=1",
      time: "12m",
      content: "WiFi died during quiz submission 💀",
      category: "gist",
      likes: 142,
      comments: 3,
      verified: true,
    },
    {
      id: 2,
      author: "Anonymous Crush",
      major: "Arts • Junior",
      avatar: "https://i.pravatar.cc/150?img=5",
      time: "1h",
      content: "Tall guy in cream hoodie 👀",
      category: "dating",
      image: "https://source.unsplash.com/800x500/?love,coffee",
      likes: 310,
      comments: 12,
      verified: false,
    },
    {
      id: 3,
      author: "Chloe Vance",
      major: "Biochemistry • Sophomore",
      avatar: "https://i.pravatar.cc/150?img=8",
      time: "2h",
      content: "Organic chemistry was pain 😭",
      category: "academics",
      bgImage: "https://source.unsplash.com/800x600/?university",
      likes: 88,
      comments: 9,
      verified: true,
    },

    {
      id: 4,
      author: "Kenny Blaze",
      major: "Engineering • 400L",
      avatar: "https://i.pravatar.cc/150?img=12",
      time: "3h",
      content: "Lecture hall AC is freezing students into zombies 💀",
      category: "gist",
      likes: 67,
      comments: 5,
      verified: false,
    },
    {
      id: 5,
      author: "Anonymous",
      major: "Unknown",
      avatar: "https://i.pravatar.cc/150?img=15",
      time: "4h",
      content: "Who keeps stealing my food 😭",
      category: "gist",
      likes: 120,
      comments: 14,
      verified: false,
    },
    {
      id: 6,
      author: "Mariam Yusuf",
      major: "Law • Senior",
      avatar: "https://i.pravatar.cc/150?img=16",
      time: "5h",
      content: "Case study tomorrow and brain is on airplane mode ✈️",
      category: "academics",
      likes: 94,
      comments: 6,
      verified: true,
    },
    {
      id: 7,
      author: "Anonymous Crush",
      major: "Medicine • Junior",
      avatar: "https://i.pravatar.cc/150?img=18",
      time: "6h",
      content: "You looked like a Netflix main character today 👀",
      category: "dating",
      likes: 230,
      comments: 18,
      verified: false,
    },
    {
      id: 8,
      author: "Tech Bro",
      major: "CS • 300L",
      avatar: "https://i.pravatar.cc/150?img=20",
      time: "7h",
      content: "If my code works first try I assume aliens fixed it 👽",
      category: "gist",
      likes: 180,
      comments: 11,
      verified: false,
    },
    {
      id: 9,
      author: "Ada Nwosu",
      major: "Mass Comm • 200L",
      avatar: "https://i.pravatar.cc/150?img=21",
      time: "8h",
      content: "Campus gossip is hotter than Jollof rice 🔥",
      category: "gist",
      likes: 200,
      comments: 22,
      verified: false,
    },
    {
      id: 10,
      author: "Study Bot",
      major: "AI Club",
      avatar: "https://i.pravatar.cc/150?img=22",
      time: "9h",
      content: "Reminder: you still have 3 unread PDFs 📚",
      category: "academics",
      likes: 310,
      comments: 30,
      verified: true,
    },
  ];

  // ================= ADDITIONAL 40 POSTS =================

  const extraPosts = Array.from({ length: 40 }).map((_, i) => {
    const types = ["gist", "dating", "academics"];
    const type = types[i % 3];

    return {
      id: i + 11,
      author: [
        "Zainab Bello",
        "John Kalu",
        "Anonymous Crush",
        "Tech Guy",
        "Campus Queen",
      ][i % 5],
      major: [
        "CS • 200L",
        "Engineering • 300L",
        "Arts • 100L",
        "Law • 400L",
        "Medicine • 200L",
      ][i % 5],
      avatar: `https://i.pravatar.cc/150?img=${i + 30}`,
      time: `${i + 10}h`,
      content: [
        "Campus is on fire today 🔥",
        "I need sleep not assignments 😭",
        "Someone just confessed in lecture hall 👀",
        "Exam season is a villain arc",
        "Food in hostel = survival mode",
      ][i % 5],
      category: type,

      likes: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 50),

      verified: i % 7 === 0,

      image: i % 6 === 0 ? "https://source.unsplash.com/800x500/?campus" : null,

      bgImage:
        i % 9 === 0 ? "https://source.unsplash.com/800x600/?university" : null,
    };
  });

  

  const toggleLike = (id) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addComment = (postId) => {
    if (!commentText.trim()) return;

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), { text: commentText, time: "now" }],
    }));

    setCommentText("");
  };

  const handleShare = async (post) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.author,
          text: post.content,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(post.content);
        alert("Copied!");
      }
    } catch (e) {}
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* FILTER */}
      <div className="flex gap-2 bg-purple-100 p-1 rounded-2xl">
        {["all", "gist", "academics", "dating"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold ${
              activeTab === tab ? "bg-purple-600 text-white" : "text-purple-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading &&
        [1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-40 bg-purple-50 rounded-2xl animate-pulse"
          />
        ))}

      {/* POSTS */}
      {!loading &&
        campusPosts
          .filter((p) => activeTab === "all" || p.category === activeTab)
          .map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl border overflow-hidden"
            >
              {/* HEADER */}
              <div className="p-5 flex justify-between">
                <div className="flex gap-3">
                  <img src={post.avatar} className="h-10 w-10 rounded-xl" />

                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-sm">{post.author}</h4>
                      {post.verified && (
                        <CheckCircle2 className="h-3 w-3 text-purple-600" />
                      )}
                    </div>

                    <p className="text-xs text-gray-400">
                      {post.major} • {post.time}
                    </p>
                  </div>
                </div>

                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </div>

              {/* TEXT */}
              <div className="px-5 pb-3 text-sm">{post.content}</div>

              {/* IMAGE POST */}
              {post.image && (
                <img
                  src={post.image}
                  className="w-full max-h-[350px] object-cover"
                />
              )}

              {/* BACKGROUND POST */}
              {post.bgImage && (
                <div
                  className="h-64 bg-cover bg-center flex items-end p-4 text-white"
                  style={{
                    backgroundImage: `url(${post.bgImage})`,
                  }}
                >
                  <div className="bg-black/40 p-3 rounded-xl w-full text-sm">
                    {post.content}
                  </div>
                </div>
              )}

              {/* STATS */}
              <div className="px-5 py-2 text-xs text-gray-500 flex justify-between">
                <span>{post.likes + (likedPosts[post.id] ? 1 : 0)} likes</span>

                <span>
                  {(comments[post.id] || []).length + post.comments} comments
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex border-t text-sm">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex-1 py-2 flex justify-center gap-2 ${
                    likedPosts[post.id] ? "text-purple-600" : "text-gray-500"
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  Like
                </button>

                <button
                  onClick={() => setActivePost(post)}
                  className="flex-1 py-2 flex justify-center gap-2 text-gray-500"
                >
                  <MessageSquare className="h-4 w-4" />
                  Comment
                </button>

                <button
                  onClick={() => handleShare(post)}
                  className="flex-1 py-2 flex justify-center gap-2 text-gray-500"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>
          ))}

      {/* COMMENT MODAL (FULL FACEBOOK STYLE) */}
      {activePost && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-t-3xl overflow-hidden">
            {/* HEADER */}
            <div className="flex justify-between p-4 border-b">
              <h3 className="font-bold">Comments</h3>
              <button onClick={() => setActivePost(null)}>
                <X />
              </button>
            </div>

            {/* COMMENTS */}
            <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
              {(comments[activePost.id] || []).map((c, i) => (
                <div key={i} className="flex gap-3">
                  <img
                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                    className="h-9 w-9 rounded-full"
                  />

                  <div className="flex-1">
                    <div className="bg-gray-100 p-2 rounded-2xl">
                      <p className="text-sm font-semibold">User {i + 1}</p>
                      <p className="text-sm">{c.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="p-3 border-t flex gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write comment..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm"
              />

              <button
                onClick={() => addComment(activePost.id)}
                className="bg-purple-600 text-white px-4 rounded-full"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
