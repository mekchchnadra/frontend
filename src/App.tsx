import "./App.css";
import Login from "@/pages/Login.tsx";
import Register from "@/pages/Register.tsx";
import { useEffect, useState } from "react";
import { RateIntern } from "@/pages/RateIntern.tsx";
import InternAnalytics from "@/pages/InternAnalytics.tsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOTP from "./pages/VerifyOTP";
import Foxian from "./pages/Foxian";
import AddAttribute from "./pages/AddAttribute";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setAuthenticated(true);
    else setAuthenticated(true);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {!authenticated ? <Login /> : <Redirect to="/rate" />}
        </Route>
        <Route path="/register">
          {!authenticated ? <Register /> : <Redirect to="/login" />}
        </Route>
        <Route path="/forgot-password">
          {!authenticated ? <ForgotPassword /> : <Redirect to="/login" />}
        </Route>
        <Route path="/verify-otp">
          {!authenticated ? <VerifyOTP /> : <Redirect to="/login" />}
        </Route>
        <Route path="/reset-password">
          {!authenticated ? <ResetPassword /> : <Redirect to="/login" />}
        </Route>

        {/* Protected Routes */}
        <Route path="/rate">
          {authenticated ? <RateIntern /> : <Redirect to="/login" />}
        </Route>
        <Route path="/analytics">
          {authenticated ? <InternAnalytics /> : <Redirect to="/login" />}
        </Route>
        {/* Route for Foxian */}
        <Route path="/Foxian">
          {authenticated ? <Foxian /> : <Redirect to="/login" />}
        </Route>

        {/* Redirect authenticated user to rate intern page */}
        <Route path="/">
          {authenticated ? <Redirect to="/rate" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
