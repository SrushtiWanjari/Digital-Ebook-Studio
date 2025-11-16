import React, { useState } from "react";
import API, { setAuthToken } from "../api.js";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setAuthToken(data.token);
      toast.success("✅ Login successful");
      if (data.user.role === "admin") nav("/admin");
      else nav("/author");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-sm w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/30"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-2 flex items-center justify-center ">
          <LogIn size={26} /> Login
        </h2>
        <p className="text-black text-center mb-6 ">Welcome back 👋</p>
        <form onSubmit={submit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.94 }}
            className="w-full py-2 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-xl transition font-semibold flex items-center justify-center gap-2"
          >
            <LogIn size={18} /> Login
          </motion.button>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
