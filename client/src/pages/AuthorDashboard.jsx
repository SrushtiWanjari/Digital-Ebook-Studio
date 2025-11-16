import React, { useEffect, useState } from "react";
import API, { setAuthToken } from "../api.js";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusCircle,
  Save,
  CheckCircle,
  LogOut,
  Home,
  FolderOpen,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";

export default function AuthorDashboard() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState(1);
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");

  const nav = useNavigate();
  const token = localStorage.getItem("token");
  if (token) setAuthToken(token);

  const fetchBooks = async () => {
    try {
      const { data } = await API.get("/books/my");

      setBooks(data);
    } catch {
      toast.error("Error loading books");
    }
  };

  const incompleteBooks = books.filter((b) => b.status !== "approved");

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (incompleteBooks.length >= 3)
      return toast.warning("❗ You can only have 3 incomplete books!");

    try {
      await API.post("/books", { title, pages, content, cover });
      toast.success("📚 Draft Created!");
      setTitle("");
      setPages(1);
      setContent("");
      setCover("");
      fetchBooks();
    } catch {
      toast.error("Create failed");
    }
  };

  const handleSave = async (book) => {
    try {
      await API.put(`/books/${book._id}`, {
        title: book.title,
        pages: book.pages,
        content: book.content,
        cover: book.cover,
        status: "draft",
      });
      toast.success("✅ Draft Saved");
      fetchBooks();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleSubmitBook = async (id) => {
    try {
      const response = await API.put(`/books/${id}`, { status: "submitted" });

      toast.success("📩 Sent for Admin Review");
      fetchBooks();
    } catch {
      toast.error("Submit failed");
    }
  };

  const uploadCover = (file, book = null) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (book) {
        book.cover = reader.result;
        setBooks([...books]);
      } else {
        setCover(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out");
    nav("/login");
  };

  // ✅ SweetAlert Delete Handler
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your book!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#1e1e2f",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      await API.delete(`/books/delete/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));

      Swal.fire({
        title: "Deleted!",
        text: "Your book has been removed successfully.",
        icon: "success",
        background: "#1e1e2f",
        color: "#fff",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error deleting book:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the book. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      {/* ✅ Navbar */}
      <div className="flex justify-between bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-4 text-white mb-8 shadow-lg">
        <div className="flex gap-6 items-center">
          <Home size={22} />
          <span className="font-bold text-lg">Author Dashboard</span>
        </div>

        <div className="flex gap-5 justify-center items-center">
          <Link to="/explore" className="hover:text-yellow-300 font-semibold">
            Explore-Books
          </Link>
          <Link to="/saved" className="hover:text-yellow-300 font-semibold">
            Saved-Books
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:animate-pulse transition font-medium shadow"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* ✅ Create Book Form */}
        <motion.form
          onSubmit={handleCreate}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/40 space-y-4"
        >
          <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-700">
            <PlusCircle /> Create New Book
          </h3>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Book Title"
            className="w-full p-2 border rounded-lg"
            required
          />

          <input
            type="number"
            value={pages}
            min="1"
            onChange={(e) => setPages(Number(e.target.value))}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadCover(e.target.files[0])}
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            className="w-full p-3 border rounded-lg"
            placeholder="Write your story..."
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow hover:scale-[1.02] transition"
          >
            Create Draft
          </motion.button>
        </motion.form>

        {/* ✅ Book List */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderOpen /> Your Books
          </h3>

          {books?.map((b) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/85 border border-white/40 backdrop-blur-xl p-4 rounded-xl shadow hover:shadow-2xl transition"
            >
              <div className="flex gap-4">
                {b.cover ? (
                  <img
                    src={b.cover}
                    alt="cover"
                    className="w-20 h-28 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-20 h-28 bg-gray-200 flex items-center justify-center rounded-lg text-xs">
                    No Cover
                  </div>
                )}

                <div className="flex-1">
                  <input
                    disabled={b.status === "approved"}
                    value={b.title}
                    onChange={(e) => {
                      b.title = e.target.value;
                      setBooks([...books]);
                    }}
                    className="w-full font-semibold border-b bg-transparent pb-1"
                  />

                  <textarea
                    rows="3"
                    disabled={b.status === "approved"}
                    value={b.content}
                    onChange={(e) => {
                      b.content = e.target.value;
                      setBooks([...books]);
                    }}
                    className="w-full mt-2 p-2 border rounded"
                  />

                  {b.status !== "approved" && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => uploadCover(e.target.files[0], b)}
                    />
                  )}

                  <div className="flex gap-2 mt-3 flex-wrap items-center">
                    {/* Submit */}
                    {b.status === "draft" && (
                      <button
                        onClick={() => handleSubmitBook(b._id)}
                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded shadow hover:bg-green-700 transition"
                      >
                        <CheckCircle size={14} /> Submit
                      </button>
                    )}

                    {b.status === "submitted" && (
                      <span className="text-sm text-yellow-600 font-semibold">
                        Pending approval...
                      </span>
                    )}

                    {/* 🗑️ Delete Button */}
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded shadow hover:bg-red-700 transition ml-auto"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
