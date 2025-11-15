import React, { useEffect, useState } from "react";
import API from "../lib/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Check, X, Users, BookOpen } from "lucide-react";

export default function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingBooks, setPendingBooks] = useState([]);

  const loadData = async () => {
    try {
      const users = await API.get(
        "/admin/pending",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("User", users);

      setPendingUsers(users.data);

      const books = await API.get("/books/admin/pending",{},
         {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("pending Books", books.data);

      setPendingBooks(books.data);
    } catch (err) {
      toast.error("Error loading dashboard");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // const approveBook = async (id) => {
  //   try {
  //     const approve = await API.put(
  //       `books/admin/${id}/approve`,
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       }
  //     );

  //     console.log("approve", approve);

  //     toast.success("✅ Book Approved & Published!");
  //     loadData();
  //   } catch {
  //     toast.error("Error approving");
  //   }
  // };


  const approveBook = async (id) => {
  const toastId = toast.loading("Approving book...");

  try {
    await API.put(
      `books/admin/${id}/approve`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
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
      `books/admin/${id}/reject`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
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

  // const rejectBook = async (id) => {
  //   try {
  //     await API.put(
  //       `books/admin/${id}/reject`,
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       }
  //     );
  //     toast.error("❌ Book Rejected");
  //     loadData();
  //   } catch {
  //     toast.error("Error rejecting");
  //   }
  // };

  // const approveUser = async (id) => {
  //   try {
  //     await API.put(`/admin/${id}/approve`,{}, {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       });
  //     toast.success("User Approved");
  //     loadData();
  //   } catch {
  //     toast.error("Error approving user");
  //   }
  // };

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
      <div className="bg-white/20 backdrop-blur-xl shadow-xl p-6 rounded-2xl border border-white/30">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <BookOpen /> Pending Books
        </h3>
        {pendingBooks.length === 0 && (
          <p className="text-white/80">No books waiting for review</p>
        )}
        {pendingBooks.map((b) => (
          <div
            key={b._id}
            className="flex justify-between items-center bg-white/70 border p-4 rounded-xl mb-2"
          >
            <div>
              <p className="font-semibold">{b.title}</p>
              {/* <p className="text-xs text-gray-600">By: {b.author?.name}</p> */}
              <p className="text-xs text-gray-600">Content: {b.content}</p>
              <img src={b.cover} alt={b.title} className="w-20 h-auto mt-2" />
              <p className="text-xs text-gray-600">
                Created At: {new Date(b.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-600">Pages: {b.pages}</p>
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
