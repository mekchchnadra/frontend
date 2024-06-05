import axiosInstance from "@/api/host";
import React, { useState } from "react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validatePassword = () => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setPasswordError("Both passwords are required");
      return false;
    } else if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    } else if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    } else if (!/[a-z]/.test(newPassword)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return false;
    } else if (!/[A-Z]/.test(newPassword)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return false;
    } else if (!/\d/.test(newPassword)) {
      setPasswordError("Password must contain at least one digit");
      return false;
    } else if (!/[@$!%*?&]/.test(newPassword)) {
      setPasswordError("Password must contain at least one special character");
      return false;
    } else if (!passwordPattern.test(newPassword)) {
      // This condition is not strictly necessary if all other conditions are checked,
      // but you can keep it for additional validation.
      setPasswordError("Password does not meet the requirements");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (validatePassword()) {
      setLoading(true); // Set loading to true while resetting password
      const resetEmail = localStorage.getItem("resetEmail");
      if (resetEmail) {
        try {
          const res = await axiosInstance.post(
            `/forgot-password/change-password/${resetEmail}`,
            {
              password: newPassword,
              confirmPassword: confirmPassword,
            }
          );
          window.alert("Password reset successfully, logging you in");

          const resp = await axiosInstance.post("/auth/login", {
            email: resetEmail,
            password: newPassword,
          });
          localStorage.removeItem("resetEmail");
          localStorage.setItem("authToken", resp.data.token);
          window.location.href = "/rate";
          // Handle success, maybe redirect the user to a success page
        } catch (err) {
          setError("Failed to reset password. Please try again.");
          console.error("Error resetting password:", err);
          // Handle error, maybe show an error message to the user
        } finally {
          setLoading(false); // Set loading back to false after resetting password
        }
      } else {
        setError("Unauthorized access. Please reset your password again.");
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
            Reset your password
          </h2>
        </div>
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-50"
              htmlFor="new-password"
            >
              Enter new password
            </label>
            <div className="mt-1">
              <input
                autoComplete="new-password"
                className={`block w-full appearance-none rounded-md border text-white ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } bg-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                id="new-password"
                name="new-password"
                placeholder="Enter your new password"
                required
                type="text"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-50"
              htmlFor="confirm-password"
            >
              Confirm new password
            </label>
            <div className="mt-1">
              <input
                autoComplete="confirm-password"
                className={`block w-full appearance-none text-white rounded-md border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } bg-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm your new password"
                required
                type="text"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {passwordError && (
                <p className="mt-2 text-sm text-red-500">{passwordError}</p>
              )}
            </div>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Resetting password..." : "Reset password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
