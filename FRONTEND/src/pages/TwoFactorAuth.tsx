import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import animationData from "../Assets/login.json";

const CODE_LENGTH = 6;

const TwoFactorAuth: React.FC = () => {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Determine context: registration or login
  const regEmail = localStorage.getItem('pending_reg_email');
  const regPassword = localStorage.getItem('pending_reg_password');
  const loginEmail = localStorage.getItem('pending_login_email');
  const isRegistration = !!regEmail && !!regPassword;
  const isLogin = !!loginEmail && !isRegistration;
  const email = isRegistration ? regEmail : loginEmail;

  useEffect(() => {
    if (!resendAvailable && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer <= 0) {
      setResendAvailable(true);
    }
  }, [timer, resendAvailable]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInput = (idx: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);
    setError('');
    if (val && idx < CODE_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
    if (!val && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('Text').replace(/\D/g, '').slice(0, CODE_LENGTH);
    if (pasted.length === CODE_LENGTH) {
      setCode(pasted.split(''));
      inputRefs.current[CODE_LENGTH - 1]?.focus();
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setError("");
    try {
      let res, data;
      if (isRegistration) {
        res = await fetch("http://localhost:8000/users/verify-registration-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp_code: code.join(""), password: regPassword }),
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Invalid code");
        // Registration successful, clear temp storage and redirect
        localStorage.removeItem('pending_reg_email');
        localStorage.removeItem('pending_reg_password');
        setSuccess(true);
        setTimeout(() => navigate('/login'), 1000);
        return;
      } else if (isLogin) {
        res = await fetch("http://localhost:8000/users/verify-login-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp_code: code.join("") }),
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Invalid code");
        // Login successful, store user info and redirect
        localStorage.setItem("role", "user");
        localStorage.setItem("user_name", data.user.name);
        localStorage.setItem("user_email", data.user.email);
        localStorage.removeItem('pending_login_email');
        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 1000);
        return;
      } else {
        setError("No OTP context found. Please start again.");
      }
    } catch (err: any) {
      setError(err.message || "Invalid code. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setTimer(30);
    setResendAvailable(false);
    setCode(Array(CODE_LENGTH).fill(''));
    setError('');
    inputRefs.current[0]?.focus();
    try {
      if (isRegistration) {
        await fetch("http://localhost:8000/users/request-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: regPassword }),
        });
      } else if (isLogin) {
        await fetch("http://localhost:8000/users/request-login-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: "" }), // password not needed for resend
        });
      }
    } catch (err: any) {
      setError("Failed to resend code. Please try again.");
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
        {/* Right Side (2FA Form) */}
        <div className="flex-1 p-10" style={{ background: '#f3f4f6' }}>
          <a href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
            <span className="mr-1">&#8592;</span> Back to Home
          </a>
          <h1 className="text-2xl font-bold mb-2">Two-Factor Authentication</h1>
          <hr className="mb-6" />
          <p className="text-gray-600 mb-6">Enter the 6-digit code sent to your email or phone.</p>
          <form onSubmit={handleVerify}>
            <label className="block mb-2 font-medium">Verification Code</label>
            <div className="flex justify-center gap-2 mb-6">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => inputRefs.current[idx] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleInput(idx, e.target.value)}
                  onPaste={handlePaste}
                  onKeyDown={e => handleKeyDown(idx, e)}
                  className="w-12 h-12 text-xl text-center rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
                  style={{ background: '#fff' }}
                  autoFocus={idx === 0}
                  aria-label={`Digit ${idx + 1}`}
                />
              ))}
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {success && <div className="text-green-600 text-sm mb-4">Success! Redirecting...</div>}
            <button
              type="submit"
              disabled={code.some(d => !d) || verifying}
              className="w-full py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {verifying ? 'Verifying...' : 'Verify'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-blue-500 text-sm hover:underline mb-2 block"
              disabled={!resendAvailable}
              onClick={handleResend}
            >
              Resend code
            </button>
            <span className="text-xs text-gray-400 block mb-2">
              {resendAvailable ? '' : `Resend available in 00:${timer.toString().padStart(2, '0')}`}
            </span>
            <button
              type="button"
              className="text-pink-500 text-sm hover:underline"
              onClick={() => alert('Switch to another method (e.g., Authenticator App or Backup Code)')}
            >
              Use a different method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth; 