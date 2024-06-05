import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/api/host";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      let passwordError = "Password must ";
      if (!/(?=.*[a-z])/.test(password)) {
        passwordError += "contain at least one lowercase letter, ";
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        passwordError += "contain at least one uppercase letter, ";
      }
      if (!/(?=.*\d)/.test(password)) {
        passwordError += "contain at least one number, ";
      }
      if (!/(?=.*[@$!%*?&])/.test(password)) {
        passwordError += "contain at least one special character, ";
      }
      if (password.length < 8) {
        passwordError += "be at least 8 characters long, ";
      }
      passwordError = passwordError.slice(0, -2); // remove the trailing comma and space
      setErrorMessage(passwordError);
      return;
    }

    try {
      await axiosInstance.post("auth/register", {
        email: email,
        password: password,
      });

      window.alert("Signup successful, Login🎆");

      const loginRes = await axiosInstance.post("auth/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("authToken", loginRes.data.token);
      window.location.href = "/rate";

      window.location.href = "/login";
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
    } catch (error) {
      localStorage.removeItem("authToken");
      console.log("ERROR:: ", error?.message);
      setErrorMessage("Internal Server Error");
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-black px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-gray-900 p-6 shadow-lg dark:border-gray-800">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Create an account</h1>
          <p className="text-gray-400">
            Enter your email and password to register.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <div className="space-y-2">
            <Label className="text-gray-400" htmlFor="email">
              Email
            </Label>
            <Input
              className="bg-gray-800 text-white placeholder:text-gray-500"
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
            />
            <p className="text-[8px] text-gray-400">
              Password must contain at least one uppercase letter, one lowercase
              letter, one number, one special character, and be at least 8
              characters long.
            </p>
          </div>
          <Button
            className="w-full bg-gray-800 text-white hover:bg-gray-700"
            type="submit"
          >
            Register
          </Button>
          {errorMessage && <p className="text-red-400">{errorMessage}</p>}
        </form>
        <p className="text-center text-sm text-gray-400">
          Already have an account?
          <Link
            className="font-medium text-gray-400 hover:underline"
            to="/login"
          >
            Sign in
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
