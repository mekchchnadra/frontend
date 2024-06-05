import axiosInstance from "@/api/host";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const validateOtp = () => {
    const otpPattern = /^\d{6}$/;
    if (!otp.trim()) {
      setOtpError("OTP is required");
      return false;
    } else if (!otpPattern.test(otp)) {
      setOtpError("OTP must be 6 digits");
      return false;
    } else {
      setOtpError("");
      return true;
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (validateOtp()) {
      setLoading(true); // Set loading to true while verifying OTP
      const resetEmail = localStorage.getItem("resetEmail");
      if (resetEmail && otp) {
        try {
          const res = await axiosInstance.get(
            `/forgot-password/verify-otp/${otp}/${resetEmail}`
          );
          window.alert(res.data);
          window.location.href = "/reset-password";
          // Handle success, maybe redirect the user to a success page
        } catch (err) {
          console.error("Error verifying OTP:", err);
          // Handle error, maybe show an error message to the user
        } finally {
          setLoading(false); // Set loading back to false after verifying OTP
        }
      } else {
        // If resetEmail is absent, show an alert and redirect to the forgot password page
        window.alert("Unauthorized access to verify OTP page.");
        window.location.href = "/forgot-password";
        setLoading(false); // Set loading back to false
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
            Verify OTP
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            An OTP has been sent to your email
          </p>
        </div>
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-50"
              htmlFor="otp"
            >
              Enter OTP
            </label>
            <div className="mt-1">
              <input
                autoComplete="one-time-code"
                className={`block w-full appearance-none rounded-md border text-white ${
                  otpError ? "border-red-500" : "border-gray-300"
                } bg-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                id="otp"
                name="otp"
                placeholder="Enter your OTP"
                required
                type="text"
                value={otp}
                onChange={handleOtpChange}
              />
              {otpError && (
                <p className="mt-2 text-sm text-red-500">{otpError}</p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
            <button
              type="button"
              className="flex w-full justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 mt-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
            >
              <Link to="/forgot-password">Back</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
