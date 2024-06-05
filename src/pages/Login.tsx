import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/api/host";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userEmail || !password) {
      setErrorMessage("Please fill out both email and password fields.");
      return;
    }

    if (!validateEmail(userEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/login", {
        email: userEmail,
        password: password,
      });

      localStorage.setItem("authToken", res.data.token);
      window.location.href = "/rate";
      toast("Logged-In successfully!🎆", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      console.log("RESPONSE::", res.data);
    } catch {
      localStorage.removeItem("authToken");
      setErrorMessage("Email or password is incorrect");
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-black px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-gray-900 p-6 shadow-lg dark:border-gray-800">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="text-gray-400">
            Enter your email and password to sign in.
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="email">
              Email
            </Label>
            <Input
              className="bg-gray-800 text-white placeholder:text-gray-500"
              id="email"
              placeholder="email@example.com"
              required
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2 relative">
            <div className="flex items-center justify-between">
              <Label className="text-gray-400" htmlFor="password">
                Password
              </Label>
              <Button
                className="text-gray-400"
                size="icon"
                variant="ghost"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>
            <Input
              className="bg-gray-800 text-white"
              id="password"
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-gray-400">
              Password must contain at least one uppercase letter, one lowercase
              letter, one number, one special character, and be at least 8
              characters long.
            </p>
          </div>
          <Button
            className="w-full bg-gray-800 text-white hover:bg-gray-700"
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            Sign in
          </Button>
          {errorMessage && <p className="text-red-400">{errorMessage}</p>}
        </form>
        <div className="text-center">
          <Link
            className="text-sm font-medium text-gray-400 hover:underline"
            to="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>
        <p className="text-center text-sm text-gray-400">
          Don't have an account?
          <Link
            className="font-medium text-gray-400 hover:underline"
            to="/register"
          >
            Sign up
          </Link>
        </p>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
