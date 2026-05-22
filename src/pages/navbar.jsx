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
} from 'lucide-react';

export default function TopNavbar({
  darkMode,
  toggleDarkMode,
  onNavigate,
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const iconBtn =
    "relative flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] text-gray-700 dark:text-gray-200 transition shrink-0";

  const badge =
    "absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-purple-600 rounded-full ring-2 ring-white dark:ring-[#242526]";

  const iconWrap =
    "h-10 w-10 min-w-[40px] min-h-[40px] rounded-full bg-gray-100 dark:bg-[#3A3B3C] flex items-center justify-center shrink-0";

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#242526]/95 backdrop-blur-md border-b border-gray-200 dark:border-[#3A3B3C]">

      <div className="h-16 px-3 sm:px-4 lg:px-6 flex items-center justify-between gap-4">

        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-4 min-w-fit">

          {/* PROFILE ICON (APP ICON STYLE) */}
          <div
            onClick={() => onNavigate('profile')}
            className="relative cursor-pointer shrink-0"
          >
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-purple-500 shadow-md"
            />

            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 border-2 border-white dark:border-[#242526] rounded-full" />
          </div>

          {/* BRAND */}
          <div className="hidden sm:block leading-tight">
            <h1 className="text-2xl font-black bg-gradient-to-r from-purple-700 to-fuchsia-600 bg-clip-text text-transparent">
              SocialGist
            </h1>
            <p className="text-[11px] text-gray-500">
              connect • vibe • gist
            </p>
          </div>

          {/* SEARCH */}
          <div className="hidden md:flex items-center bg-gray-100 dark:bg-[#3A3B3C] rounded-full h-11 px-4 w-72 lg:w-80">
            <Search className="h-4 w-4 text-gray-500 shrink-0" />
            <input
              className="bg-transparent outline-none border-none text-sm ml-3 w-full text-gray-800 dark:text-white placeholder:text-gray-500"
              placeholder="Search posts, people, memes..."
            />
          </div>
        </div>

        {/* ================= CENTER NAV ================= */}
        <div className="hidden lg:flex items-center gap-2 flex-1 justify-center max-w-2xl">

          <NavButton icon={<Home className="h-5 w-5" />} label="Home" active />
          <NavButton icon={<Users className="h-5 w-5" />} label="Friends" />
          <NavButton icon={<Tv className="h-5 w-5" />} label="Videos" />
          <NavButton icon={<Store className="h-5 w-5" />} label="Market" />
          <NavButton icon={<Flame className="h-5 w-5" />} label="Trending" />
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* SEARCH MOBILE */}
          <button className={iconBtn + " md:hidden"}>
            <Search className="h-5 w-5" />
          </button>

          {/* CREATE */}
          <button className="hidden sm:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 h-10 rounded-full text-sm font-semibold shadow-md shrink-0">
            <Plus className="h-4 w-4" />
            Create
          </button>

          {/* DARK MODE */}
          <button onClick={toggleDarkMode} className={iconBtn}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* MESSAGES */}
          <button className={iconBtn}>
            <MessageCircle className="h-5 w-5" />
            <span className={badge}>4</span>
          </button>

          {/* NOTIFICATIONS */}
          <button className={iconBtn}>
            <Bell className="h-5 w-5" />
            <span className={badge + " bg-red-500"}>9</span>
          </button>

          {/* PROFILE MENU */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] rounded-full pl-1 pr-3 py-1"
            >
              <img
                src="https://i.pravatar.cc/150?img=12"
                className="h-9 w-9 rounded-full"
              />
              <span className="hidden sm:block text-sm font-semibold text-gray-800 dark:text-white">
                Prince
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3A3B3C] rounded-2xl shadow-xl overflow-hidden">

                <div className="p-4 border-b border-gray-200 dark:border-[#3A3B3C] flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Prince
                    </div>
                    <div className="text-sm text-gray-500">
                      View profile
                    </div>
                  </div>
                </div>

                <div className="p-2 space-y-1">
                  <DropdownItem icon={<User className="h-5 w-5" />} label="Profile" />
                  <DropdownItem icon={<Bookmark className="h-5 w-5" />} label="Saved" />
                  <DropdownItem icon={<Settings className="h-5 w-5" />} label="Settings" />
                  <DropdownItem icon={<Moon className="h-5 w-5" />} label="Appearance" onClick={toggleDarkMode} />
                  <DropdownItem icon={<LogOut className="h-5 w-5" />} label="Logout" />
                </div>
              </div>
            )}
          </div>

          {/* MOBILE MENU */}
          <div className="relative lg:hidden">
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className={iconBtn}>
              <Menu className="h-5 w-5" />
            </button>

            {showMobileMenu && (
              <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3A3B3C] rounded-2xl shadow-xl overflow-hidden">

                <div className="p-4 border-b border-gray-200 dark:border-[#3A3B3C] flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <div className="font-bold text-white">Prince</div>
                    <div className="text-sm text-gray-500">@socialgist</div>
                  </div>
                </div>

                <div className="p-2 space-y-1">
                  <MobileItem icon={<Home className="h-5 w-5" />} label="Home" />
                  <MobileItem icon={<Users className="h-5 w-5" />} label="Friends" />
                  <MobileItem icon={<Tv className="h-5 w-5" />} label="Videos" />
                  <MobileItem icon={<Store className="h-5 w-5" />} label="Market" />
                  <MobileItem icon={<Flame className="h-5 w-5" />} label="Trending" />
                  <MobileItem icon={<Bell className="h-5 w-5" />} label="Notifications" />
                  <MobileItem icon={<MessageCircle className="h-5 w-5" />} label="Messages" />
                  <MobileItem icon={<Settings className="h-5 w-5" />} label="Settings" />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

/* ================= NAV BUTTON ================= */
function NavButton({ icon, label, active }) {
  return (
    <button className={`flex flex-col items-center justify-center h-14 min-w-[90px] px-4 rounded-2xl shrink-0 transition
      ${active ? 'text-purple-600' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'}`}>
      <div className="h-6 w-6 flex items-center justify-center">{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}

/* ================= DROPDOWN ================= */
function DropdownItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#3A3B3C]"
    >
      <div className="h-9 w-9 flex items-center justify-center bg-gray-100 dark:bg-[#3A3B3C] rounded-full">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

/* ================= MOBILE ================= */
function MobileItem({ icon, label }) {
  return (
    <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#3A3B3C]">
      <div className="h-10 w-10 flex items-center justify-center bg-gray-100 dark:bg-[#3A3B3C] rounded-full">
        {icon}
      </div>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}