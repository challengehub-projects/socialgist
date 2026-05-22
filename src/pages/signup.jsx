import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Sparkles, ArrowRight } from 'lucide-react';

export default function SignupPage({ onNavigate }) {
  // 'email' or 'phone' registration method toggle
  const [signupMethod, setSignupMethod] = useState('email');

  return (
    <div className="min-h-screen bg-purple-50 text-purple-950 flex items-center justify-center p-6 selection:bg-purple-600 selection:text-white">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-purple-100 shadow-xl shadow-purple-200/30 flex flex-col relative overflow-hidden">
        
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
          <h2 className="text-2xl font-bold tracking-tight text-purple-950">Create your account</h2>
          <p className="text-sm text-purple-400 mt-1">Join the ultimate campus playground</p>
        </div>

        {/* Auth Method Toggles */}
        <div className="flex p-1 bg-purple-50 rounded-xl mb-6 relative z-10">
          <button
            type="button"
            onClick={() => setSignupMethod('email')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              signupMethod === 'email' 
                ? 'bg-white text-purple-900 shadow-sm' 
                : 'text-purple-400 hover:text-purple-700'
            }`}
          >
            Email Address
          </button>
          <button
            type="button"
            onClick={() => setSignupMethod('phone')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              signupMethod === 'phone' 
                ? 'bg-white text-purple-900 shadow-sm' 
                : 'text-purple-400 hover:text-purple-700'
            }`}
          >
            Phone Number
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 relative z-10">
          
          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-purple-500/80 mb-2">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-purple-300">
                <User className="h-4 w-4" />
              </span>
              <input 
                type="text" 
                placeholder="Alex Johnson" 
                className="w-full pl-11 pr-4 py-3 bg-purple-50/50 border border-purple-100 rounded-2xl text-sm focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/5 transition-all placeholder:text-purple-300 text-purple-950"
                required
              />
            </div>
          </div>

          {/* Dynamic Input based on Choice (Email or Phone) */}
          {signupMethod === 'email' ? (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-purple-500/80 mb-2">University Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-purple-300">
                  <Mail className="h-4 w-4" />
                </span>
                <input 
                  type="email" 
                  placeholder="alex.j@university.edu" 
                  className="w-full pl-11 pr-4 py-3 bg-purple-50/50 border border-purple-100 rounded-2xl text-sm focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/5 transition-all placeholder:text-purple-300 text-purple-950"
                  required
                />
              </div>
              <span className="text-[11px] text-purple-400/80 mt-1.5 block pl-1">Must be an institutional email address</span>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-purple-500/80 mb-2">Phone Number</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-purple-300">
                  <Phone className="h-4 w-4" />
                </span>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  className="w-full pl-11 pr-4 py-3 bg-purple-50/50 border border-purple-100 rounded-2xl text-sm focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/5 transition-all placeholder:text-purple-300 text-purple-950"
                  required
                />
              </div>
              <span className="text-[11px] text-purple-400/80 mt-1.5 block pl-1">We will send a security verification text</span>
            </div>
          )}

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-purple-500/80 mb-2">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-purple-300">
                <Lock className="h-4 w-4" />
              </span>
              <input 
                type="password" 
                placeholder="Minimum 8 characters" 
                className="w-full pl-11 pr-4 py-3 bg-purple-50/50 border border-purple-100 rounded-2xl text-sm focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/5 transition-all placeholder:text-purple-300 text-purple-950"
                required
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input 
              type="checkbox" 
              id="terms" 
              className="mt-1 h-4 w-4 rounded border-purple-200 text-purple-600 focus:ring-purple-500/30 accent-purple-600" 
              required 
            />
            <label htmlFor="terms" className="text-xs text-purple-400/90 leading-normal">
              I agree to the <a href="#terms" className="text-purple-600 font-medium hover:underline">Terms of Service</a> and community honor code.
            </label>
          </div>

          {/* Action Button */}
          <button 
            type="submit" 
            className="w-full group inline-flex items-center justify-center gap-2 py-3.5 mt-2 bg-purple-600 text-white font-medium rounded-2xl hover:bg-purple-500 active:scale-[0.99] transition-all shadow-md shadow-purple-200"
          >
            Create account
            <ArrowRight className="h-4 w-4 text-purple-200 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>

        {/* Navigation Footer */}
        <p className="text-sm text-center text-purple-400 mt-8 relative z-10">
          Already have an account?{' '}
          <button 
            onClick={() => onNavigate('login')} 
            className="font-semibold text-purple-600 hover:text-purple-500 transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
