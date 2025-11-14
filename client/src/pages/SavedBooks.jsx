import React, { useEffect, useState } from "react";
import { Book, Trash2, Home } from "lucide-react";

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-pink-600 p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Book size={22} /> Saved Books
        </h2>
        <a href="/author" className="flex items-center gap-1 hover:text-yellow-300">
          <Home size={18} /> Back
        </a>
      </div>

      {books.length === 0 ? (
        <p>No saved books yet ⭐</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {books.map((b) => (
            <div key={b._id} className="bg-white/20 p-4 rounded-xl backdrop-blur-md shadow-lg">
              <img src={b.cover} className="h-40 w-full object-cover rounded-md mb-3" />
              <h3 className="font-bold text-lg">{b.title}</h3>
              <p className="text-sm opacity-80 mt-1">{b.content.slice(0, 100)}...</p>

              <button
                onClick={() => removeBook(b._id)}
                className="mt-3 w-full py-2 bg-red-500 text-white rounded-lg flex items-center justify-center gap-2 font-semibold"
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
