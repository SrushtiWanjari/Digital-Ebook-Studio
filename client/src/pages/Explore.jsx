import React, { useEffect, useState } from "react";
import API, { setAuthToken } from "../lib/api";
import { BookmarkPlus, Book, Home } from "lucide-react";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function Explore() {
  const [books, setBooks] = useState([]);

  const token = localStorage.getItem("token");
  if (token) setAuthToken(token);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await API.get("/books/public");
        setBooks(data);
      } catch (err) {
        toast.error("Failed to fetch public books");
      }
    };
    fetchBooks();
  }, []);

  const saveBook = (book) => {
    let saved = JSON.parse(localStorage.getItem("savedBooks")) || [];
    if (saved.find((b) => b._id === book._id)) {
      return toast.info("Already saved!");
    }
    saved.push(book);
    localStorage.setItem("savedBooks", JSON.stringify(saved));
    toast.success("Book saved!");
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out");
    nav("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-6 text-white">
      <div className="flex justify-between bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-4 text-white mb-8 shadow-lg">
        <div className="flex gap-6 items-center">
          <Home size={22} />
          <span className="font-bold text-lg">Author Dashboard</span>
        </div>

        <div className="flex gap-5 justify-center items-center">
          <Link to="/explore" className="hover:text-yellow-300 font-semibold">
            Explore
          </Link>
          <Link to="/saved" className="hover:text-yellow-300 font-semibold">
            Saved Drafts
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:animate-pulse transition font-medium shadow"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Book size={22} /> Explore Books
        </h2>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((b) => (
          <div
            key={b._id}
            className="bg-white/20 p-4 rounded-xl backdrop-blur-md shadow-lg hover:scale-[1.02] transition transform"
          >
            {/* Image container (adjustable height/width) */}
            <div className="w-full h-56 flex justify-center items-center bg-white rounded-md overflow-hidden mb-3 shadow-sm">
              <img
                src={b.cover || ""}
                className="max-h-full max-w-full object-contain"
                alt={b.title}
              />
            </div>

            <h3 className="font-bold text-lg">{b.title}</h3>
            <p className="text-sm opacity-80 mt-1">
              {b.content?.slice(0, 100)}...
            </p>

            <button
              onClick={() => saveBook(b)}
              className="mt-3 w-full py-2 bg-yellow-400 text-black rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-yellow-300 transition"
            >
              <BookmarkPlus size={16} /> Save Book
            </button>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <p className="text-center mt-10 text-lg opacity-80">
          No books available
        </p>
      )}
    </div>
  );
}
