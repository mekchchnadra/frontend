import axiosInstance from "@/api/host";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (validateEmail()) {
      setLoading(true); // Set loading to true while sending OTP
      try {
        const res = await axiosInstance.get(
          `/forgot-password/send-otp/${email}`
        );
        if (res.data) {
          window.alert(res.data);
          localStorage.setItem("resetEmail", email);
          window.location.href = "/verify-otp";
        }
      } catch (err) {
        setEmailError("Please enter a valid email");
        console.log("ERROR:", err);
      } finally {
        setLoading(false); // Set loading back to false after sending OTP
      }
    }
  };

  return (
    <div
      key="1"
      className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-50">
            Enter your email to send OTP
          </h2>
        </div>
        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-50"
              htmlFor="email"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                autoComplete="email"
                className={`block w-full appearance-none rounded-md border ${
                  emailError ? "border-red-500" : "border-gray-300"
                } bg-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={validateEmail}
              />
              {emailError && (
                <p className="mt-2 text-sm text-red-500">{emailError}</p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            <button
              type="button"
              className="flex w-full justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 mt-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
            >
              <Link to="/login">Back</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
