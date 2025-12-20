import React, { useEffect, useState } from "react";
import API from "../api.js";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Check, X, Users, BookOpen } from "lucide-react";

export default function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingBooks, setPendingBooks] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);

  const getAdminToken = () => localStorage.getItem("adminToken");

  const loadData = async () => {
    try {
      const adminToken = getAdminToken();
      if (!adminToken) {
        toast.error("Admin not logged in");
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${adminToken}` },
      };

      const users = await API.get("/admin/pending", config);
      setPendingUsers(users.data);

      const books = await API.get("/books/admin/pending", config);
      setPendingBooks(books.data);
    } catch (err) {
      toast.error("Admin session expired. Please login again.");
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
        { headers: { Authorization: `Bearer ${getAdminToken()}` } }
      );

      toast.update(toastId, {
        render: "📚 Book Approved & Published!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      loadData();
    } catch {
      toast.update(toastId, {
        render: "❌ Error approving book",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const rejectBook = async (id) => {
    const toastId = toast.loading("Rejecting book...");
    try {
      await API.put(
        `/books/admin/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${getAdminToken()}` } }
      );

      toast.update(toastId, {
        render: "❌ Book Rejected",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });

      loadData();
    } catch {
      toast.update(toastId, {
        render: "⚠ Error rejecting book",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const approveUser = async (id) => {
    const toastId = toast.loading("Approving...");
    try {
      await API.put(
        `/admin/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${getAdminToken()}` } }
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
        { headers: { Authorization: `Bearer ${getAdminToken()}` } }
      );

      toast.update(toastId, {
        render: "User Rejected",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      loadData();
    } catch {
      toast.update(toastId, {
        render: "Error rejecting user",
        type: "error",
        isLoading: false,
        autoClose: 1000,
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

      {/* Pending Books */}
      <div className="bg-white/20 backdrop-blur-xl shadow-xl p-6 rounded-2xl border border-white/30 relative">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <BookOpen /> Pending Books
        </h3>

        {pendingBooks.length === 0 && (
          <p className="text-white/80">No books waiting for review</p>
        )}

        {pendingBooks.map((b) => (
          <div
            key={b._id}
            className="flex justify-between items-center bg-white/70 border px-4 py-2 rounded-xl mb-2"
          >
            <div className="flex">
              <img src={b.cover} alt={b.title} className="w-24" />
              <div className="ml-6">
                <p className="font-semibold text-lg">Title: {b.title}</p>
                <p className="text-sm">
                  {expandedBook === b._id ? b.content : b.content.split(" ").slice(0, 100).join(" ")}
                  {b.content.split(" ").length > 100 && (
                    <button
                      onClick={() =>
                        setExpandedBook(expandedBook === b._id ? null : b._id)
                      }
                      className="text-blue-700 ml-2 underline"
                    >
                      {expandedBook === b._id ? "Show Less" : "Show More"}
                    </button>
                  )}
                </p>
                <p className="text-xs text-red-900 mt-2">
                  Author: {b.author?.name} <br />
                  Created At: {new Date(b.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
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
