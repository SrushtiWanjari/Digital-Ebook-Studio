import React, { useEffect, useState } from "react";
import API from "../api.js";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Check, X, Users, BookOpen } from "lucide-react";

export default function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingBooks, setPendingBooks] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);

  const loadData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      const users = await API.get("/admin/pending", config);
      setPendingUsers(users.data);

      const books = await API.get("/books/admin/pending", config);
      setPendingBooks(books.data);
    } catch (err) {
      toast.error("Error loading dashboard");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const approveBook = async (id) => {
    const toastId = toast.loading("Approving book...");

    try {
      await API.put(
        `/books/admin/${id}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.update(toastId, {
        render: "📚 Book Approved & Published!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      loadData();
    } catch {
      toast.update(toastId, {
        render: "❌ Error approving book",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const rejectBook = async (id) => {
    const toastId = toast.loading("Rejecting book...");

    try {
      await API.put(
        `/books/admin/${id}/reject`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.update(toastId, {
        render: "❌ Book Rejected",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });

      loadData();
    } catch {
      toast.update(toastId, {
        render: "⚠ Error rejecting book",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const approveUser = async (id) => {
    const toastId = toast.loading("Approving..."); // show loader immediately

    try {
      await API.put(
        `/admin/${id}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.update(toastId, {
        render: "User Approved",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      loadData();
    } catch {
      toast.update(toastId, {
        render: "Error approving user",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const rejectUser = async (id) => {
    const toastId = toast.loading("Rejecting...");
    try {
      await API.put(
        `/admin/${id}/reject`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.update(toastId, {
        render: "User Approved",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      loadData();
    } catch {
      toast.update(toastId, {
        render: "Error approving user",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#5135ff] via-[#6a4dff] to-[#9b51ff]">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold text-white mb-6 flex items-center gap-2"
      >
        <Users className="w-8 h-8" /> Admin Dashboard
      </motion.h2>

      {/* Pending Users */}
      <div className="bg-white/20 backdrop-blur-xl shadow-xl p-6 rounded-2xl border border-white/30 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Pending Users</h3>
        {pendingUsers.length === 0 && (
          <p className="text-white/80">No pending users</p>
        )}
        {pendingUsers.map((u) => (
          <div
            key={u._id}
            className="flex justify-between items-center bg-white/70 border p-4 rounded-xl mb-2"
          >
            <div>
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-gray-600">{u.email}</p>
              <p className="text-sm text-gray-600">Bio: {u.bio}</p>
              <p className="text-sm text-gray-600">
                Experience: {u.writingExperience}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => approveUser(u._id)}
                className="p-2 bg-green-600 text-white rounded"
              >
                <Check size={18} />
              </button>
              <button
                onClick={() => rejectUser(u._id)}
                className="p-2 bg-red-600 text-white rounded"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/20 backdrop-blur-xl shadow-xl p-6 rounded-2xl border border-white/30 relative">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <BookOpen /> Pending Books
        </h3>
        {pendingBooks.length === 0 && (
          <p className="text-white/80">No books waiting for review</p>
        )}
        {pendingBooks.map((b) => (
          <div
            key={b?._id}
            className="flex justify-between items-center bg-white/70 border px-4 py-2 rounded-xl mb-2"
          >
            <div className="flex items-center justify-start">
              <div>
                {" "}
                <img src={b.cover} alt={b.title} className="w-fit " />
              </div>
              <div className="ml-7 px-2 py-2">
                <p className="font-semibold text-[20px] ">Title: {b?.title}</p>

                <p className="text-lg ">
                  <span className="font-semibold">Content: </span>
                  {(() => {
                    const words = b.content.split(" ");
                    const isLong = words.length > 100;
                    const shortText = words.slice(0, 100).join(" ");
                    const isExpanded = expandedBook === b._id;
                    return (
                      <div className="justify pr-5">
                        {isExpanded ? b.content : shortText}
                        {isLong && (
                          <button
                            onClick={() =>
                              setExpandedBook(isExpanded ? null : b._id)
                            }
                            className="text-blue-700 font-semibold ml-2 underline"
                          >
                            {isExpanded ? "Show Less" : "... Show More"}
                          </button>
                        )}
                      </div>
                    );
                  })()}
                </p>

                <p className="text-sm text-gray-600 font-semibold ">
                  Pages:{" "}
                  <span className="rounded-full bg-red-300 px-2 py-1">
                    {b.pages}
                  </span>{" "}
                </p>
              </div>

              <p className="text-xs text-red-900 font-semibold   absolute bottom-10 right-10">
                Author: {b?.author?.name}
                <br />
                Created At: {new Date(b.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className=" flex gap-2 ">
              <button
                onClick={() => approveBook(b._id)}
                className="p-2 bg-green-600 text-white rounded"
              >
                <Check size={18} />
              </button>
              <button
                onClick={() => rejectBook(b._id)}
                className="p-2 bg-red-600 text-white rounded"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
