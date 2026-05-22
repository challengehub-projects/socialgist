import React, { useState } from 'react';
import { Mail, Lock, Sparkles, ArrowRight, Eye, EyeOff, MessageSquare, Flame, GraduationCap } from 'lucide-react';

export default function LoginPage({ onNavigate }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-purple-50 text-purple-950 flex font-sans antialiased selection:bg-purple-600 selection:text-white">
      
      {/* LEFT SIDE: FORM CONTAINER (Centered on mobile, 50% width on desktop) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 bg-purple-50">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-purple-100 shadow-xl shadow-purple-200/20 flex flex-col relative overflow-hidden">
          
          {/* Subtle Decorative Aura Background Blur */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-fuchsia-200 rounded-full blur-3xl opacity-60 pointer-events-none" />

          {/* Brand Header */}
          <div className="flex flex-col items-center mb-8 relative z-10">
            <button 
              onClick={() => onNavigate('welcome')} 
              className="h-12 w-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-200 mb-4 hover:opacity-90 transition-opacity"
            >
              <img src="/icon.png" alt="Logo" />
            </button>
            <h2 className="text-2xl font-bold tracking-tight text-purple-950">Welcome back</h2>
            <p className="text-sm text-purple-400 mt-1">Catch up on the latest campus tea</p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5 relative z-10">
            
            {/* Input: Identifier (Email/Phone) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-purple-500/80 mb-2">
                Campus Email or Phone
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-purple-300">
                  <Mail className="h-4 w-4" />
                </span>
                <input 
                  type="text" 
                  placeholder="you@university.edu or phone number" 
                  className="w-full pl-11 pr-4 py-3 bg-purple-50/50 border border-purple-100 rounded-2xl text-sm focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/5 transition-all placeholder:text-purple-300 text-purple-950"
                  required
                />
              </div>
            </div>

            {/* Input: Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-500/80">
                  Password
                </label>
                <a 
                  href="#forgot" 
                  className="text-xs font-semibold text-purple-600 hover:text-purple-500 transition-colors"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-purple-300">
                  <Lock className="h-4 w-4" />
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-12 py-3 bg-purple-50/50 border border-purple-100 rounded-2xl text-sm focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/5 transition-all placeholder:text-purple-300 text-purple-950"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-300 hover:text-purple-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2.5 pt-0.5">
              <input 
                type="checkbox" 
                id="remember" 
                className="h-4 w-4 rounded border-purple-200 text-purple-600 focus:ring-purple-500/30 accent-purple-600" 
              />
              <label htmlFor="remember" className="text-xs text-purple-400/90 font-medium select-none cursor-pointer">
                Keep me signed in
              </label>
            </div>

            {/* Sign In Button */}
            <button 
              type="submit" 
              className="w-full group inline-flex items-center justify-center gap-2 py-3.5 mt-2 bg-purple-600 text-white font-medium rounded-2xl hover:bg-purple-500 active:scale-[0.99] transition-all shadow-md shadow-purple-200"
            >
              Sign in
              <ArrowRight className="h-4 w-4 text-purple-200 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          {/* Navigation Footer */}
          <p className="text-sm text-center text-purple-400 mt-8 relative z-10">
            New to the playground?{' '}
            <button 
              onClick={() => onNavigate('signup')} 
              className="font-semibold text-purple-600 hover:text-purple-500 transition-colors"
            >
              Create account
            </button>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: RICH IMAGE HERO VISUAL (Hidden on smaller screens, shown on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-purple-950 items-center justify-center p-12">
        {/* Dynamic Unsplash Campus Social Image */}
        <img 
          src="https://unsplash.com" 
          alt="Students laughing together" 
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity scale-105"
        />
        
        {/* Rich Purple-To-Fuchsia Linear Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/95 via-purple-900/90 to-fuchsia-900/50" />
        
        {/* Glowing Decorative Floating Lights */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl" />

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-md text-white text-center lg:text-left space-y-6">
          <div className="inline-flex gap-2 items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-purple-200">
            <Flame className="h-4 w-4 text-fuchsia-400" />
            <span className="text-xs font-semibold tracking-wide uppercase">What's Hot Today</span>
          </div>
          
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
            Step back into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-300">
              the inner circle.
            </span>
          </h2>
          
          <p className="text-purple-200/80 text-sm leading-relaxed">
            Your peers are talking, voting on memes, sharing test blueprints, and matching up. Log back in so you don't stay out of the loop.
          </p>

          {/* Trending Snippets Display */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/5 shadow-inner">
              <div className="h-8 w-8 rounded-xl bg-purple-500 flex items-center justify-center text-white shrink-0">
                <MessageSquare className="h-4 w-4" />
              </div>
              <p className="text-xs text-purple-100">
                <strong>Trending:</strong> "The engineering quiz answers got leaked on the main board..." 
                <span className="block text-[10px] text-purple-300 mt-0.5">🔥 142 students viewing right now</span>
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/5 shadow-inner">
              <div className="h-8 w-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white shrink-0">
                <GraduationCap className="h-4 w-4" />
              </div>
              <p className="text-xs text-purple-100">
                <strong>Academic Help:</strong> Fresh Chemistry past questions uploaded for midterms.
                <span className="block text-[10px] text-purple-300 mt-0.5">👍 45 upvotes</span>
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
