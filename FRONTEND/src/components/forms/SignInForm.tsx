import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../Assets/login.json";
// import { loginSuperadmin } from '../lib/utils';

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!email || !password) {
      setError("Please fill in both email and password.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/users/request-login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Login failed");
        setLoading(false);
        return;
      }
      // Store email for OTP verification
      localStorage.setItem("pending_login_email", email);
      // Redirect to OTP verification page
      navigate("/verify-login-otp");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Side (Animation and Branding) */}
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-10">
          <h2 className="text-xl font-bold mb-4">Cybersecurity Umbrella</h2>
          <p className="mb-6 text-center text-gray-600">
            We&apos;ve got tips and tools to keep your business growing while you&apos;re out of the office.
          </p>  
          <div className="w-64">
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          </div>
        </div>
        {/* Right Side (Login Form) */}
        <div className="flex-1 p-10" style={{ background: '#f3f4f6' }}>
          <a href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
            <span className="mr-1">&#8592;</span> Back to Home
          </a>
          <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
          <hr className="mb-6" />
          <form onSubmit={handleLogin}>
            <label className="block mb-2 font-medium">Email Address</label>
            <input
              type="text"
              className="w-full mb-4 px-4 py-2 rounded"
              style={{ background: '#fff' }}
              placeholder="Enter your email or username"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label className="block mb-2 font-medium">Password</label>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded"
                style={{ background: '#fff' }}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                Keep me logged in
              </label>
              <a href="/forgot-password" className="text-blue-500 text-sm hover:underline">
                Forgot password?
              </a>
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Generating otp..." : "Log in"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-pink-500 hover:underline">
              Sign up
            </a>
          </p>
          <p className="mt-2 text-center text-sm">
            <a href="/NS-MS-1127/login" className="text-blue-500 hover:underline">
              Admin Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 