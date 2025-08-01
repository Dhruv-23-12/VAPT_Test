import { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../Assets/Animation - 1750930278136.json";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/users/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Registration failed");
        return;
      }
      // Store email and password for OTP verification
      localStorage.setItem("pending_reg_email", email);
      localStorage.setItem("pending_reg_password", password);
      // Redirect to OTP verification page
      navigate("/verify-registration-otp");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="flex-1 p-10">
          <a href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
            <span className="mr-1">&#8592;</span> Back to Home
          </a>
          <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
          <hr className="mb-6" />
          <form onSubmit={handleSignup}>
            <label className="block mb-2 font-medium">Email Address</label>
            <input
              type="email"
              className="w-full mb-4 px-4 py-2 rounded"
              style={{ background: '#f3f4f6' }}
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label className="block mb-2 font-medium">Password</label>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded"
                style={{ background: '#f3f4f6' }}
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
            <label className="block mb-2 font-medium">Confirm Password</label>
            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded"
                style={{ background: '#f3f4f6' }}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowConfirmPassword((v) => !v)}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            >
              Sign up
            </button>
          </form>
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-pink-500 hover:underline">
              Sign in
            </a>
          </p>
        </div>
        {/* Right Side */}
        <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-10">
          <h2 className="text-xl font-bold mb-4">Cybersecurity Umbrella</h2>
          <p className="mb-6 text-center text-gray-600">
            We&apos;ve got tips and tools to keep your business growing while you&apos;re out of the office.
          </p>
          <div className="w-64">
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
