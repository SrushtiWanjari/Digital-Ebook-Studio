import React, { useEffect, useState } from "react";
import API, { setAuthToken } from "../lib/api";
import { BookmarkPlus, Book, Home } from "lucide-react";
import { toast } from "react-toastify";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Book size={22} /> Explore Books
        </h2>
        <a href="/author" className="flex items-center gap-1 hover:text-yellow-300">
          <Home size={18} />Back
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {books.map((b) => (
          <div key={b._id} className="bg-white/20 p-4 rounded-xl backdrop-blur-md shadow-lg">
            <img
              src={b.cover || ""}
              className="h-40 w-full object-cover rounded-md mb-3"
            />
            <h3 className="font-bold text-lg">{b.title}</h3>
            <p className="text-sm opacity-80 mt-1">{b.content.slice(0, 100)}...</p>

            <button
              onClick={() => saveBook(b)}
              className="mt-3 w-full py-2 bg-yellow-400 text-black rounded-lg flex items-center justify-center gap-2 font-semibold"
            >
              <BookmarkPlus size={16} /> Save Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
