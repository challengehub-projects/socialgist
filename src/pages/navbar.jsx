import React, { useState } from 'react';
import {
  Search,
  Bell,
  MessageCircle,
  Home,
  Users,
  Tv,
  Store,
  Menu,
  Moon,
  Sun,
  ChevronDown,
  Settings,
  Bookmark,
  LogOut,
  User,
  Plus,
  Flame,
  X,
} from 'lucide-react';

import { supabase } from '../configs/supbase';

export default function TopNavbar({
  darkMode,
  toggleDarkMode,
  onNavigate,
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // CREATE POST STATE
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [postText, setPostText] = useState("");
  const [creating, setCreating] = useState(false);

  const iconBtn =
    "relative flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] text-gray-700 dark:text-gray-200 transition shrink-0";

  const badge =
    "absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-purple-600 rounded-full ring-2 ring-white dark:ring-[#242526]";

  // ================= CREATE POST =================
  const createPost = async () => {
    if (!postText.trim()) return;

    setCreating(true);

    const { error } = await supabase.from("posts").insert([
      {
        content: postText,
        created_at: new Date(),
      },
    ]);

    setCreating(false);

    if (error) {
      alert(error.message);
      return;
    }

    setPostText("");
    setShowCreateModal(false);

    // trigger feed refresh if you're listening
    window.dispatchEvent(new Event("refresh-feed"));
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#242526]/95 backdrop-blur-md border-b border-gray-200 dark:border-[#3A3B3C]">

        <div className="h-16 px-3 sm:px-4 lg:px-6 flex items-center justify-between gap-4">

          {/* LEFT */}
          <div className="flex items-center gap-4 min-w-fit">

            <div
              onClick={() => onNavigate('profile')}
              className="relative cursor-pointer shrink-0"
            >
              <img
                src="https://i.pravatar.cc/150?img=12"
                className="h-11 w-11 rounded-full object-cover ring-2 ring-purple-500 shadow-md"
              />
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 border-2 border-white rounded-full" />
            </div>

            <div className="hidden sm:block leading-tight">
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-700 to-fuchsia-600 bg-clip-text text-transparent">
                SocialGist
              </h1>
              <p className="text-[11px] text-gray-500">
                connect • vibe • gist
              </p>
            </div>

            <div className="hidden md:flex items-center bg-gray-100 dark:bg-[#3A3B3C] rounded-full h-11 px-4 w-72 lg:w-80">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                className="bg-transparent outline-none ml-3 w-full text-sm"
                placeholder="Search posts, people, memes..."
              />
            </div>

          </div>

          {/* CENTER NAV */}
          <div className="hidden lg:flex items-center gap-2 flex-1 justify-center max-w-2xl">
            <NavButton icon={<Home className="h-5 w-5" />} label="Home" active />
            <NavButton icon={<Users className="h-5 w-5" />} label="Friends" />
            <NavButton icon={<Tv className="h-5 w-5" />} label="Videos" />
            <NavButton icon={<Store className="h-5 w-5" />} label="Market" />
            <NavButton icon={<Flame className="h-5 w-5" />} label="Trending" />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            {/* CREATE BUTTON */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="hidden sm:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 h-10 rounded-full text-sm font-semibold shadow-md"
            >
              <Plus className="h-4 w-4" />
              Create
            </button>

            <button onClick={toggleDarkMode} className={iconBtn}>
              {darkMode ? <Sun /> : <Moon />}
            </button>

            <button className={iconBtn}>
              <MessageCircle />
              <span className={badge}>4</span>
            </button>

            <button className={iconBtn}>
              <Bell />
              <span className={`${badge} bg-red-500`}>9</span>
            </button>

          </div>

        </div>
      </header>

      {/* ================= FACEBOOK STYLE CENTER MODAL ================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="font-bold text-lg">Create post</h2>

              <button
                onClick={() => setShowCreateModal(false)}
                className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* BODY */}
            <div className="p-5">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What's happening on campus?"
                className="w-full h-40 resize-none outline-none text-sm"
              />
            </div>

            {/* FOOTER */}
            <div className="px-5 py-4 border-t flex justify-end">
              <button
                onClick={createPost}
                disabled={creating}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-semibold disabled:opacity-50"
              >
                {creating ? "Posting..." : "Post"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

/* ================= NAV BUTTON ================= */
function NavButton({ icon, label, active }) {
  return (
    <button className={`flex flex-col items-center justify-center h-14 min-w-[90px] px-4 rounded-2xl transition
      ${active ? 'text-purple-600' : 'text-gray-500 hover:bg-gray-100'}`}>
      <div className="h-6 w-6 flex items-center justify-center">{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}