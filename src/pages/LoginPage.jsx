// pages/LoginPage.jsx

import {
  FaGoogle,
  FaApple,
} from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f5f7f8] flex items-center justify-center px-6">
      
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-6xl font-extrabold text-green-500 leading-tight">
            Social Gist
          </h1>

          <p className="mt-5 text-2xl text-gray-700 leading-relaxed max-w-lg">
            Connect with friends, discover trends, and share your lifestyle beautifully.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center">
          
          <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome Back
              </h2>

              <p className="text-gray-500 mt-2">
                Login to continue
              </p>
            </div>

            {/* Form */}
            <div className="space-y-5">
              
              <input
                type="text"
                placeholder="Email address or phone number"
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-400 transition"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-400 transition"
              />

              {/* Login Button */}
              <button className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-green-200">
                Log In
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <a
                  href="/"
                  className="text-green-500 text-sm hover:underline"
                >
                  Forgotten password?
                </a>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[1px] bg-gray-200"></div>

                <span className="text-gray-400 text-sm">
                  OR
                </span>

                <div className="flex-1 h-[1px] bg-gray-200"></div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4">
                
                <button className="h-14 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
                  <FaGoogle className="text-red-500 text-xl" />
                </button>

                <button className="h-14 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
                  <FaApple className="text-black text-xl" />
                </button>
              </div>

              {/* Create Account */}
              <button className="w-full bg-[#111827] hover:bg-black transition text-white py-4 rounded-2xl font-semibold mt-2">
                Create New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}