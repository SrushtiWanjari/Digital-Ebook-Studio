import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, LogIn, UserPlus } from "lucide-react";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([
    {
      name: "Srushti Wanjari",
      rating: 5,
      description:
        "Absolutely love this eBook platform! Clean design, easy navigation, and an amazing reading experience.",
    },
    {
      name: "Aarav Sharma",
      rating: 4,
      description:
        "Very smooth and modern UI. The approval system is neat — just wish it had more book genres.",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rating: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || formData.rating === 0) {
      alert("Please fill all fields and select a rating.");
      return;
    }
    setReviews([formData, ...reviews]);
    setFormData({ name: "", description: "", rating: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-fuchsia-600 text-white">
      {/* 🔹 Navbar (same as Home page) */}
      <header className="backdrop-blur-lg bg-white/10 border-b border-white/30 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-pink-200 text-transparent bg-clip-text drop-shadow-lg">
            Digital Ebook Studio
          </h1>
          <nav className="flex gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/30 text-white hover:bg-white/40 transition font-medium shadow"
            >
              Home
            </Link>
            <Link
              to="/reviews"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium shadow-lg"
            >
              Reviews
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/30 text-white hover:bg-white/40 transition font-medium shadow"
            >
              <LogIn size={18} /> Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 transition text-white font-medium shadow-lg"
            >
              <UserPlus size={18} /> Register
            </Link>
          </nav>
        </div>
      </header>

      {/* 🔹 Review Page Heading */}
      <motion.h1
        className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200 mt-12 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Share Your Experience 🌟
      </motion.h1>

      {/* 🔹 Review Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg p-6 space-y-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <label className="block text-white/90 font-semibold mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-white/90 font-semibold mb-2">
            Your Review
          </label>
          <textarea
            placeholder="Write your thoughts..."
            rows="3"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-white/90 font-semibold mb-2">
            Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className={`cursor-pointer transition-all ${
                  star <= formData.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-white/40"
                }`}
                onClick={() => setFormData({ ...formData, rating: star })}
              />
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold rounded-lg hover:opacity-90 transition"
        >
          Submit Review
        </motion.button>
      </motion.form>

      {/* 🔹 Reviews Section */}
      <div className="max-w-8xl mx-auto mt-16 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pb-20">
        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            className="bg-white/15 border border-white/30 p-4 rounded-xl shadow-lg backdrop-blur-lg hover:scale-105 transition"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h3 className="text-lg font-semibold text-pink-300">
              {review.name}
            </h3>
            <p className="text-white/80 mt-2 text-sm">{review.description}</p>
            <div className="flex mt-3">
              {[...Array(review.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center text-white/80 text-sm py-6 border-t border-white/20">
        © {new Date().getFullYear()} Digital Ebook Studio · Made with 💜
      </footer>
    </div>
  );
};

export default ReviewPage;
