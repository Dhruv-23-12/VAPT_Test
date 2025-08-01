import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../Assets/signin.json";

const CODE_LENGTH = 6;

const Superadmin2FA: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes in seconds
  const navigate = useNavigate();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const email = localStorage.getItem("2fa_email");

  useEffect(() => {
    // Redirect if no email found
    if (!email) {
      navigate("/NS-MS-1127/login");
      return;
    }

    // Auto-focus the first OTP input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Timer for OTP expiration
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setError("OTP has expired. Please login again.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1 || !/^[0-9]?$/.test(value)) return; // Only single digit allowed

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const otpCode = otp.join("");

    if (otpCode.length !== CODE_LENGTH) {
      setError("Please enter the complete 6-digit OTP code.");
      setLoading(false);
      return;
    }

    try {
      // Use your actual backend endpoint here
      const res = await fetch("http://localhost:8000/NS-MS-1127/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: email,
          otp_code: otpCode
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "OTP verification failed");
      }

      setSuccess("Login successful! Redirecting...");

      // Store admin data if needed
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "superadmin");
      localStorage.setItem("token", data.token || "dummy_token"); // Use real token if available
      localStorage.removeItem("login_step");

      // Redirect to admin dashboard
      setTimeout(() => {
        navigate("/NS-MS-1127");
      }, 2000);

    } catch (err: any) {
      setError(err.message || "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Use your actual backend endpoint here
      const res = await fetch("http://localhost:8000/Tfa/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Failed to resend OTP");
      }

      setSuccess("New OTP sent to your email!");
      setTimeLeft(600); // Reset timer
      setOtp(Array(CODE_LENGTH).fill("")); // Clear OTP inputs

    } catch (err: any) {
      setError(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="flex w-full max-w-4xl shadow-2xl rounded-xl overflow-hidden backdrop-blur-sm bg-gray-800/50 border border-gray-700/50">
        {/* Left Side (Animation and Info) */}
        <div className="flex-1 bg-gradient-to-br from-gray-800 to-slate-900 flex flex-col items-center justify-center p-10 text-white border-r border-gray-700/50">
          <h2 className="text-2xl font-bold mb-4 text-center">SuperAdmin Portal</h2>
          <p className="mb-6 text-center text-gray-300 leading-relaxed">
            Secure administrative access to the system. Please authenticate to continue.
          </p>
          <div className="w-64">
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          </div>
        </div>

        {/* Right Side (OTP Form) */}
        <div className="flex-1 p-10 bg-gradient-to-br from-gray-800 to-slate-900">
          <a
            href="/NS-MS-1127/login"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <span className="mr-1">&#8592;</span> Back to Login
          </a>

          <h1 className="text-3xl font-bold mb-2 text-white">Verify Your Identity</h1>
          <p className="text-gray-300 mb-6">
            Enter the 6-digit code sent to <strong>{email}</strong>
          </p>

          <form onSubmit={handleVerifyOtp}>
            <label className="block mb-4 font-medium text-gray-300">Verification Code</label>
            <div className="flex gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-bold border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 shadow-sm"
                  value={digit}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                />
              ))}
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-400">
                Code expires in: <span className="font-medium">{formatTime(timeLeft)}</span>
              </p>
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
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105 active:scale-95 mb-4"
              disabled={loading || timeLeft === 0}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              className="w-full py-3 rounded-lg border-2 border-gray-600 text-gray-200 font-medium hover:bg-gray-700/50 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={loading || timeLeft > 540}
            >
              {loading ? "Sending..." : "Resend Code"}
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

export default Superadmin2FA;