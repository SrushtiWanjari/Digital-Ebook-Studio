import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogIn,
  UserPlus,
  BookOpen,
  PenTool,
  Layers,
  Rocket,
  Globe2,
  Star,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const scaleUp = {
    hidden: { scale: 0.9, opacity: 0 },
    show: { scale: 1, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-fuchsia-600 text-white overflow-x-hidden relative">
      {/* glowing orbs */}
      <div className="absolute top-20 left-10 w-60 h-60 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl"></div>

      {/* HEADER */}
      <header className="backdrop-blur-lg bg-white/10 border-b border-white/30 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-pink-200 text-transparent bg-clip-text drop-shadow-lg">
            Digital Ebook Studio
          </h1>
          <nav className="flex gap-4">
            <Link
              to="/reviews"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/30 text-white hover:bg-white/40 transition font-medium shadow"
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium shadow-lg"
            >
              <UserPlus size={18} /> Register
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <main className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <h2 className="text-5xl font-extrabold leading-tight drop-shadow-lg">
            Create Beautiful eBooks{" "}
            <span className="block text-indigo-200">
              Effortlessly & Creatively
            </span>
          </h2>
          <p className="text-white/90 text-lg mt-4">
            From your first word to your final cover, Digital Ebook Studio helps
            you write, design, and publish stories that inspire the world.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-3 mt-6 px-8 py-4 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 transition"
          >
            <BookOpen size={22} /> Start Creating Now
          </Link>
        </motion.div>

        {/* ✅ REPLACED EDITOR PREVIEW SECTION */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={scaleUp}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-purple-700 mb-3 flex items-center gap-2">
            <Sparkles className="text-fuchsia-600" /> Live Editor Preview
          </h3>
          <div className="h-64 overflow-y-auto p-4 rounded-lg bg-gradient-to-b from-white/60 to-white/90 border border-white/40 shadow-inner space-y-3 text-gray-700 text-sm">
            <p>✍️ Rich text editor with auto-save</p>
            <p>🖼️ Add covers & visual themes</p>
            <p>📚 Save drafts or publish directly</p>
            <p>✅ Admin review system for quality</p>
            <p>📄 Multi-page content structure</p>
            <p>🎨 Theme preview with custom colors</p>
          </div>
        </motion.div>
      </main>

      {/* WHO IT'S FOR */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <h3 className="text-3xl font-bold mb-4">For Authors</h3>
          <p className="text-white/85 leading-relaxed mb-6">
            Whether you’re a student, blogger, or professional writer — our
            intuitive tools let you focus purely on storytelling. Enjoy live
            previews, design templates, and a friendly publishing workflow.
          </p>
          <ul className="space-y-3 text-white/85">
            <li>🖊️ Real-time Writing Experience</li>
            <li>📄 Auto-formatting & Cover Design</li>
            <li>💬 Admin feedback before publishing</li>
          </ul>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <h3 className="text-3xl font-bold mb-4">For Readers</h3>
          <p className="text-white/85 leading-relaxed mb-6">
            Readers can explore books from emerging authors worldwide. A vibrant
            collection of stories, poems, and guides — all beautifully
            formatted.
          </p>
          <ul className="space-y-3 text-white/85">
            <li>📚 Thousands of free reads</li>
            <li>⭐ Rate and review eBooks</li>
            <li>🌐 Global creator community</li>
          </ul>
        </motion.div>
      </section>

      {/* CORE FEATURES */}
      <section className="bg-white/10 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-10">
          <h2 className="text-3xl font-bold">Core Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: PenTool,
                title: "Minimal Writing Space",
                desc: "A clean editor that lets your words flow freely without clutter.",
              },
              {
                icon: Layers,
                title: "Beautiful Templates",
                desc: "Professional cover and layout styles you can customize easily.",
              },
              {
                icon: Rocket,
                title: "Fast Publishing",
                desc: "Submit for admin approval and publish within hours.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial="hidden"
                animate="show"
                variants={{
                  ...fadeUp,
                  transition: { delay: i * 0.1 },
                }}
                className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/40 to-pink-500/40 border border-white/30 shadow-lg backdrop-blur-lg hover:scale-105 transition"
              >
                <f.icon size={40} className="mx-auto mb-3 text-white" />
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-white/80 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR VISION */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center space-y-6">
        <Sparkles className="mx-auto text-yellow-300" size={40} />
        <motion.h2
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-3xl font-bold"
        >
          Our Vision
        </motion.h2>
        <p className="text-white/85 max-w-3xl mx-auto text-lg leading-relaxed">
          At Digital Ebook Studio, we believe storytelling should be effortless.
          Our goal is to empower every creator — from students to professionals
          — to turn their imagination into timeless digital art without any
          technical barriers.
        </p>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-6 text-center">
        {[
          { num: "3,200+", label: "Ebooks Drafted" },
          { num: "950+", label: "Published Authors" },
          { num: "120+", label: "Templates Available" },
          { num: "40+", label: "Countries Reached" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial="hidden"
            animate="show"
            variants={{ ...fadeUp, transition: { delay: i * 0.1 } }}
            className="p-6 bg-white/15 border border-white/20 rounded-2xl backdrop-blur-lg shadow-xl"
          >
            <p className="text-3xl font-extrabold">{s.num}</p>
            <p className="text-sm text-white/80">{s.label}</p>
          </motion.div>
        ))}
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-gradient-to-r from-indigo-700/60 to-fuchsia-700/60 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Creator Stories</h2>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="p-8 bg-white/20 border border-white/25 rounded-2xl backdrop-blur-lg shadow-xl"
          >
            <Star className="mx-auto text-yellow-300 mb-3" />
            <p className="text-white/90 text-lg italic">
              “I never thought publishing an eBook could be this simple! The
              tools are intuitive, and the final design looks professional. I’m
              proud to share my story now.”
            </p>
            <p className="mt-4 text-white/70 text-sm">
              — Aanya Mehta, Author of “Waves of Words”
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-gradient-to-r from-purple-600 to-indigo-600 backdrop-blur-xl">
        <motion.h2
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-4xl font-bold mb-4"
        >
          Ready to Publish Your Story?
        </motion.h2>
        <p className="text-white/90 mb-8 text-lg">
          Join thousands of storytellers shaping the future of digital books.
        </p>
        <Link
          to="/register"
          className="px-8 py-4 text-lg bg-white text-purple-700 rounded-xl shadow-xl hover:scale-105 transition font-semibold"
        >
          Start for Free
        </Link>
      </section>

      <footer className="text-center text-white/80 text-sm py-6">
        © {new Date().getFullYear()} Digital Ebook Studio · Made with 💜
      </footer>
    </div>
  );
}
