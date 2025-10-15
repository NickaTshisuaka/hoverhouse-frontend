import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/animations/Home.json";
import axios from "axios";
import "./AuthPage.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(null); // {text, type}

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        const res = await axios.post(`${API}/login`, { email: form.email, password: form.password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify({ email: form.email }));
        showMessage("Login successful!", "success", true);
      } else {
        await axios.post(`${API}/signup`, form);
        showMessage("Account created successfully!", "success", true);
      }
    } catch (err) {
      showMessage(isSignIn ? "Invalid credentials." : "Error signing up.", "error", false);
    }
  };

  const showMessage = (text, type, redirect = false) => {
    setMessage({ text, type });
    if (redirect) {
      setTimeout(() => navigate("/dashboard"), 2000);
    }
    setTimeout(() => setMessage(null), 2000);
  };

  const toggleAuth = () => {
    setIsSignIn(!isSignIn);
    setForm({ name: "", email: "", password: "" });
  };

  // Determine panel order and colors
  const formSide = isSignIn ? "right" : "left";
  const animSide = isSignIn ? "left" : "right";

  const formBg = isSignIn ? "#ffe4c4" : "#001f3f"; // Blanched Almond / Navy
  const animBg = isSignIn ? "#001f3f" : "#ffe4c4";
  const messageBg = isSignIn ? "#001f3f" : "#ffe4c4"; // always opposite
  const messageColor = isSignIn ? "#ffe4c4" : "#001f3f";

  return (
    <div className="auth-container">
      {/* Pop-up */}
      <AnimatePresence>
        {message && (
          <motion.div
            className="auth-message-popup"
            style={{ backgroundColor: messageBg, color: messageColor }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animation Panel */}
      <motion.div
        className={`auth-panel ${animSide}`}
        animate={{ x: 0 }}
        style={{ backgroundColor: animBg }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <Lottie animationData={animationData} loop autoplay style={{ width: "90%", height: "130%" }} />
      </motion.div>

      {/* Form Panel */}
      <motion.div
        className={`auth-panel ${formSide}`}
        animate={{ x: 0 }}
        style={{ backgroundColor: formBg }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <motion.div
          className="auth-form-container"
          key={isSignIn ? "signin" : "signup"}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{isSignIn ? "Welcome Back" : "Create Account"}</h2>
          <form onSubmit={handleSubmit}>
            {!isSignIn && (
              <>
                <label>Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
              </>
            )}
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
            <button type="submit">{isSignIn ? "Login" : "Sign Up"}</button>
          </form>
          <p className="switch-text" onClick={toggleAuth}>
            {isSignIn ? (
              <>Don’t have an account? <span>Register here</span></>
            ) : (
              <>Already have an account? <span>Login here</span></>
            )}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
