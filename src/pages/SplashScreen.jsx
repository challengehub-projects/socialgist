// pages/SplashScreen.jsx

import { MessageCircle } from "lucide-react";

export default function SplashScreen() {
  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Soft Green Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-green-200 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-emerald-100 rounded-full blur-3xl opacity-50"></div>

      {/* Logo */}
      <div className="w-28 h-28 rounded-3xl bg-green-500 flex items-center justify-center shadow-2xl shadow-green-200">
        <MessageCircle size={50} className="text-white" />
      </div>

      {/* App Name */}
      <h1 className="mt-8 text-5xl font-extrabold text-gray-800 tracking-tight">
        Social Gist
      </h1>

      {/* Tagline */}
      <p className="mt-4 text-gray-500 text-center max-w-sm leading-relaxed text-lg">
        Connect with people, share stories, and stay updated with trending conversations.
      </p>

      {/* Loader */}
      <div className="mt-10">
        <div className="w-10 h-10 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}