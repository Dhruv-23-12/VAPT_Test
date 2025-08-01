import { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../Assets/login.json";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    setLoading(true);
    const res = await fetch("http://localhost:8000/users/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) setMessage("Check your email for a reset link.");
    else setError(data.detail || "Failed to send reset link.");
    setLoading(false);
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
          <button className="mb-6 px-6 py-2 rounded border border-gray-300 font-medium hover:bg-gray-200">
            START ACADEMY
          </button>
          <div className="w-64">
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          </div>
        </div>
        {/* Right Side (Forgot Password Form) */}
        <div className="flex-1 p-10" style={{ background: '#f3f4f6' }}>
          <a href="/login" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
            <span className="mr-1">&#8592;</span> Back to Login
          </a>
          <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
          <hr className="mb-6" />
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-medium">Email Address</label>
            <input
              type="email"
              className="w-full mb-4 px-4 py-2 rounded"
              style={{ background: '#fff' }}
              placeholder="Enter your registered email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {message && <div className="text-green-600 text-sm mb-4">{message}</div>}
            <button
              type="submit"
              className="w-full py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
