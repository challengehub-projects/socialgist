import React, { useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { supabase } from '../configs/supbase';

export default function SignupPage({ onNavigate }) {
  const [signupMethod, setSignupMethod] = useState('email');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ================= INPUT HANDLER (UNCHANGED LOGIC SAFE) =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : typeof value === 'string'
          ? value.replace(/\s+/g, name === 'email' ? '' : ' ').trimStart()
          : value,
    }));
  };

  // ================= VALIDATION =================
  const isValid = (() => {
    const nameValid = form.fullName.trim().length >= 2;
    const passwordValid = form.password.trim().length >= 6;
    const termsValid = form.terms;

    if (signupMethod === 'email') {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim().toLowerCase()
      );
      return nameValid && passwordValid && termsValid && emailValid;
    }

    const phoneValid = form.phone.trim().length >= 10;
    return nameValid && passwordValid && termsValid && phoneValid;
  })();

  // ================= SAFE SIGNUP LOGIC =================
  const handleSignup = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const fullName = form.fullName.trim();
      const email = form.email.trim().toLowerCase();
      const phone = form.phone.trim();
      const password = form.password.trim();

      if (!fullName || password.length < 6) {
        throw new Error('Invalid form data');
      }

      // ================= EMAIL SIGNUP =================
      if (signupMethod === 'email') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        // IMPORTANT SAFETY CHECK (prevents confusion from DB trigger crash)
        if (!data?.user) {
          throw new Error('Signup failed. Try again.');
        }

        setSuccess(
          data.session
            ? 'Account created successfully!'
            : 'Check your email to confirm your account!'
        );
      }

      // ================= PHONE SIGNUP =================
      else {
        const { error } = await supabase.auth.signInWithOtp({
          phone,
          options: {
            channel: 'sms',
          },
        });

        if (error) throw error;

        setSuccess('OTP sent to your phone number!');
      }

      // navigation
      setTimeout(() => {
        onNavigate('login');
      }, 1500);

    } catch (err) {
      console.log('Signup error:', err);

      const msg = err?.message?.toLowerCase() || '';

      // cleaner Supabase error handling
      if (msg.includes('user already registered')) {
        setError('Account already exists.');
      } else if (msg.includes('rate limit')) {
        setError('Too many attempts. Wait a few minutes.');
      } else if (msg.includes('sms')) {
        setError('Phone OTP failed. Try again.');
      } else if (msg.includes('database')) {
        setError('Server error during signup. Check backend trigger.');
      } else {
        setError(err.message || 'Signup failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 text-purple-950 flex items-center justify-center p-6 selection:bg-purple-600 selection:text-white">

      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-purple-100 shadow-xl shadow-purple-200/30 flex flex-col relative overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-fuchsia-200 rounded-full blur-3xl opacity-60 pointer-events-none" />

        {/* HEADER */}
        <div className="flex flex-col items-center mb-8 relative z-10">
          <button
            onClick={() => onNavigate('welcome')}
            className="h-12 w-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-200 mb-4 hover:opacity-90 transition-opacity"
          >
            <img src="/icon.png" alt="Logo" />
          </button>

          <h2 className="text-2xl font-bold tracking-tight text-purple-950">
            Create your account
          </h2>

          <p className="text-sm text-purple-400 mt-1">
            Join the ultimate campus playground
          </p>
        </div>

        {/* TOGGLE */}
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

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-4 relative z-10">

          {/* NAME */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-purple-500/80 mb-2">
              Full Name
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-purple-300">
                <User className="h-4 w-4" />
              </span>

              <input
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Alex Johnson"
                className="w-full pl-11 pr-4 py-3 bg-purple-50/50 border border-purple-100 rounded-2xl text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* EMAIL / PHONE */}
          {signupMethod === 'email' ? (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-purple-500/80 mb-2">
                University Email
              </label>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-purple-300">
                  <Mail className="h-4 w-4" />
                </span>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="alex@university.edu"
                  className="w-full pl-11 pr-4 py-3 bg-purple-50/50 border border-purple-100 rounded-2xl text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-purple-500/80 mb-2">
                Phone Number
              </label>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-purple-300">
                  <Phone className="h-4 w-4" />
                </span>

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+2348012345678"
                  className="w-full pl-11 pr-4 py-3 bg-purple-50/50 border border-purple-100 rounded-2xl text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          {/* PASSWORD */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-purple-500/80 mb-2">
              Password
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-purple-300">
                <Lock className="h-4 w-4" />
              </span>

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className="w-full pl-11 pr-4 py-3 bg-purple-50/50 border border-purple-100 rounded-2xl text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* TERMS */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-purple-200 accent-purple-600"
            />

            <label className="text-xs text-purple-400/90">
              I agree to Terms of Service
            </label>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl px-4 py-3">
              {success}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full group inline-flex items-center justify-center gap-2 py-3.5 mt-2 bg-purple-600 text-white font-medium rounded-2xl hover:bg-purple-500 active:scale-[0.99] transition-all shadow-md shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* FOOTER */}
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