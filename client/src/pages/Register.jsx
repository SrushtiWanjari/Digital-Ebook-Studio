// import React, { useState } from "react";
// import API from "../api.js";
// import { toast } from "react-toastify";
// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { User, Mail, Lock, FileText, BookOpen } from "lucide-react";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [bio, setBio] = useState("");
//   const [writingExperience, setWritingExperience] = useState("");
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await API.post("/auth/register", {
//         name,
//         email,
//         password,
//         bio,
//         writingExperience,
//       });

//       localStorage.setItem(
//         "pendingUser",
//         JSON.stringify({ name, email, bio, writingExperience })
//       );
//       toast.success("🎉 Registered! Await admin approval.");
//       setTimeout(() => nav("/login"), 1000);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4C1D95] via-[#5B21B6] to-[#3B82F6] p-4 relative overflow-hidden">
//       <div className="absolute w-[350px] h-[350px] bg-indigo-400/30 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
//       <div className="absolute w-[300px] h-[300px] bg-pink-500/30 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

//       <motion.div
//         initial={{ opacity: 0, y: 40, scale: 0.9 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="max-w-lg w-full bg-white/20 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-8 border border-white/30"
//       >
//         <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent mb-6 drop-shadow-md">
//           Register as Author
//         </h2>
//         <form
//           onSubmit={submit}
//           className="space-y-5 max-h-[70vh] overflow-y-auto pr-2"
//         >
//           <div className="relative group">
//             <User
//               className="absolute left-3 top-3 text-white/80 group-focus-within:text-white transition"
//               size={20}
//             />
//             <input
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Your Full Name"
//               className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
//             />
//           </div>
//           <div className="relative group">
//             <Mail
//               className="absolute left-3 top-3 text-white/80 group-focus-within:text-white transition"
//               size={20}
//             />
//             <input
//               required
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email Address"
//               className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
//             />
//           </div>
//           <div className="relative group">
//             <Lock
//               className="absolute left-3 top-3 text-white/80 group-focus-within:text-white transition"
//               size={20}
//             />
//             <input
//               required
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
//             />
//           </div>
//           <div className="relative group">
//             <FileText
//               className="absolute left-3 top-3 text-white/80 group-focus-within:text-white transition"
//               size={20}
//             />
//             <textarea
//               required
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               placeholder="Short Bio (Why do you want to write? Your genre?)"
//               className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 h-20 resize-none"
//             ></textarea>
//           </div>
//           <div className="relative group">
//             <BookOpen
//               className="absolute left-3 top-3 text-white/80 group-focus-within:text-white transition"
//               size={20}
//             />
//             <textarea
//               required
//               value={writingExperience}
//               onChange={(e) => setWritingExperience(e.target.value)}
//               placeholder="Writing Experience (Published? Blogs? New writer?)"
//               className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 h-20 resize-none"
//             ></textarea>
//           </div>
//           <motion.button
//             whileTap={{ scale: 0.97 }}
//             whileHover={{ scale: 1.02 }}
//             className="w-full py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-2xl font-semibold"
//           >
//             🚀 Register
//           </motion.button>
//         </form>
//         <p className="text-center text-md text-white/80 mt-4">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-red-900 font-semibold hover:underline"
//           >
//             Login
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }


import React, { useState } from "react";
import API from "../api.js";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, FileText, BookOpen, Eye, EyeOff } from "lucide-react"; // 👈 added Eye / EyeOff

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [writingExperience, setWritingExperience] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 added
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        password,
        bio,
        writingExperience,
      });

      localStorage.setItem(
        "pendingUser",
        JSON.stringify({ name, email, bio, writingExperience })
      );
      toast.success("🎉 Registered! Await admin approval.");
      setTimeout(() => nav("/login"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4C1D95] via-[#5B21B6] to-[#3B82F6] p-4 relative overflow-hidden">
      <div className="absolute w-[350px] h-[350px] bg-indigo-400/30 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] bg-pink-500/30 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg w-full bg-white/20 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-8 border border-white/30"
      >
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent mb-6 drop-shadow-md">
          Register as Author
        </h2>
        <form
          onSubmit={submit}
          className="space-y-5 max-h-[70vh] overflow-y-auto pr-2"
        >
          <div className="relative group">
            <User
              className="absolute left-3 top-3 text-white/80 group-focus-within:text-white transition"
              size={20}
            />
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Full Name"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div className="relative group">
            <Mail
              className="absolute left-3 top-3 text-white/80 group-focus-within:text-white transition"
              size={20}
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* 🔥 updated for hide/show password (ONLY this block changed) */}
          <div className="relative group">
            <Lock
              className="absolute left-3 top-3 text-white/80 group-focus-within:text-white transition"
              size={20}
            />
            <input
              required
              type={showPassword ? "text" : "password"} // 👈 toggle
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <div
              className="absolute right-3 top-3 cursor-pointer text-white/80 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          {/* 🔥 END */}

          <div className="relative group">
            <FileText
              className="absolute left-3 top-3 text-white/80 group-focus-within:text-white transition"
              size={20}
            />
            <textarea
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Short Bio (Why do you want to write? Your genre?)"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 h-20 resize-none"
            ></textarea>
          </div>
          <div className="relative group">
            <BookOpen
              className="absolute left-3 top-3 text-white/80 group-focus-within:text-white transition"
              size={20}
            />
            <textarea
              required
              value={writingExperience}
              onChange={(e) => setWritingExperience(e.target.value)}
              placeholder="Writing Experience (Published? Blogs? New writer?)"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 h-20 resize-none"
            ></textarea>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            className="w-full py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-2xl font-semibold"
          >
            🚀 Register
          </motion.button>
        </form>
        <p className="text-center text-md text-white/80 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-900 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

