import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../Assets/signin.json";

const SuperadminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validate input fields
    if (!email || !password) {
      setError("Please fill in both email and password.");
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/NS-MS-1127/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // Store user data for OTP verification
      localStorage.setItem("role", "superadmin");
      localStorage.setItem("2fa_email", email);
      localStorage.setItem("login_step", "otp_pending");

      setSuccess("OTP sent to your email! Redirecting...");
      
      // Redirect to OTP verification page after 2 seconds
      setTimeout(() => {
        navigate("/NS-MS-1127/otp");
      }, 2000);

    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="flex w-full max-w-4xl shadow-2xl rounded-xl overflow-hidden backdrop-blur-sm bg-gray-800/50 border border-gray-700/50">
        {/* Left Side (Animation and Branding) */}
        <div className="flex-1 bg-gradient-to-br from-gray-800 to-slate-900 flex flex-col items-center justify-center p-10 text-white border-r border-gray-700/50">
          <h2 className="text-2xl font-bold mb-4 text-center">SuperAdmin Portal</h2>
          <p className="mb-6 text-center text-gray-300 leading-relaxed">
            Secure administrative access to the system. Please authenticate to continue.
          </p>
          <div className="w-64">
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="flex-1 p-10 bg-gradient-to-br from-gray-800 to-slate-900">
          <a href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4 transition-colors">
            <span className="mr-1">&#8592;</span> Back to Home
          </a>
          <h1 className="text-3xl font-bold mb-2 text-white">Superadmin Login</h1>
          <hr className="mb-6 border-gray-600" />
          
          <form onSubmit={handleLogin}>
            <label className="block mb-2 font-medium text-gray-300">Email Address</label>
            <input
              type="email"
              className="w-full mb-4 px-4 py-3 rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 shadow-sm"
              placeholder="Enter your admin email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value.trim())}
              required
            />

            <label className="block mb-2 font-medium text-gray-300">Password</label>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 shadow-sm"
                placeholder="Enter your admin password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200 transition-colors"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsChecked(e.target.checked)}
                  className="rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
                />
                Keep me logged in
              </label>
              <a href="#" className="text-blue-400 text-sm hover:underline transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-300 text-sm mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="text-green-300 text-sm mb-4 p-3 bg-green-900/30 border border-green-700/50 rounded-lg">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105 active:scale-95"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Login to Superadmin"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Need help?{" "}
            <a href="/contact" className="text-blue-400 hover:underline transition-colors">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperadminLogin;