import React, { useEffect, useState } from "react";
import { Book, Trash2, Home } from "lucide-react";
import { toast } from "react-toastify";

export default function SavedBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedBooks")) || [];
    setBooks(saved);
  }, []);

  const removeBook = (id) => {
    const filtered = books.filter((b) => b._id !== id);
    localStorage.setItem("savedBooks", JSON.stringify(filtered));
    setBooks(filtered);
    toast.info("Book removed from saved list");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-pink-600 p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Book size={22} /> Saved Books
        </h2>

        <a
          href="/author"
          className="flex items-center gap-1 hover:text-yellow-300 transition"
        >
          <Home size={18} /> Back
        </a>
      </div>

      {books.length === 0 ? (
        <div className="flex flex-col items-center mt-20 opacity-90">
          <Book size={60} className="mb-4" />
          <p className="text-lg font-semibold">No saved books yet ⭐</p>
          <p className="text-sm opacity-80 mt-1">Go explore and save your favourites!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((b) => (
            <div
              key={b._id}
              className="bg-white/20 p-4 rounded-xl backdrop-blur-md shadow-lg hover:scale-[1.02] transition transform"
            >
              {/* Image container (auto-fit without distortion) */}
              <div className="w-full h-56 flex justify-center items-center bg-white rounded-md overflow-hidden mb-3 shadow-sm">
                <img
                  src={b.cover || ""}
                  className="max-h-full max-w-full object-contain"
                  alt={b.title}
                />
              </div>

              <h3 className="font-bold text-lg">{b.title}</h3>
              <p className="text-sm opacity-80 mt-1">{b.content?.slice(0, 100)}...</p>

              <button
                onClick={() => removeBook(b._id)}
                className="mt-3 w-full py-2 bg-red-500 hover:bg-red-400 transition text-white rounded-lg flex items-center justify-center gap-2 font-semibold"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
