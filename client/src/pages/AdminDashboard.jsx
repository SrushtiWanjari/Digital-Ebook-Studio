// import React, { useEffect, useState } from "react";
// import API from "../lib/api";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import { Check, X, Users } from "lucide-react";

// export default function AdminDashboard() {
//   const [pendingUsers, setPendingUsers] = useState([]);
//   const [localPendingUser, setLocalPendingUser] = useState(null);

//   useEffect(() => {
//     const data = localStorage.getItem("pendingUser");
//     if (data) setLocalPendingUser(JSON.parse(data));
//   }, []);

//   const load = async () => {
//     try {
//       const u = await API.get("/admin/pending", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setPendingUsers(u.data);
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Failed to load");
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const approveUser = async (id) => {
//     try {
//       await API.put(
//         `/admin/${id}/approve`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       toast.success("User Approved");
//       load();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Approve failed");
//     }
//   };

//   const rejectUser = async (id) => {
//     try {
//       await API.put(
//         `/admin/${id}/reject`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       toast.error("User Rejected");
//       load();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Reject failed");
//     }
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gradient-to-br from-[#5135ff] via-[#6a4dff] to-[#9b51ff]">
//       <motion.h2
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-extrabold text-white mb-6 flex items-center gap-2"
//       >
//         <Users className="w-8 h-8" /> Admin Dashboard
//       </motion.h2>
//       <motion.div
//         initial={{ opacity: 0, scale: 0.98 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="bg-white/20 backdrop-blur-xl shadow-xl p-6 rounded-2xl border border-white/30 max-w-4xl mx-auto"
//       >
//         <h3 className="text-xl font-semibold text-white mb-4">Pending Users</h3>
//         <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
//           {pendingUsers.length === 0 && !localPendingUser && (
//             <p className="text-white/80 text-sm">No pending users</p>
//           )}
//           {localPendingUser && (
//             <div className="flex justify-between items-center p-4 bg-yellow-100 rounded-xl border border-yellow-300">
//               <div>
//                 <p className="font-semibold">{localPendingUser.name}</p>
//                 <p className="text-xs text-gray-600">
//                   {localPendingUser.email}
//                 </p>
//                 <p className="text-sm text-gray-700">{localPendingUser.bio}</p>
//                 <p className="text-sm text-gray-700">
//                   {localPendingUser.writingExperience}
//                 </p>
//                 <p className="text-[10px] text-yellow-700 italic">
//                   Waiting for server approval
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">
//                   <Check size={18} />
//                 </button>
//                 <button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
//                   <X size={18} />
//                 </button>
//               </div>
//             </div>
//           )}
//           {pendingUsers.map((u) => (
//             <motion.div
//               key={u._id}
//               initial={{ opacity: 0, y: 5 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white/70 backdrop-blur-md rounded-xl border border-white/50"
//             >
//               <div className="flex-1">
//                 <p className="font-semibold text-lg">{u.name}</p>
//                 <p className="text-xs text-gray-600">{u.email}</p>
//                 <p className="text-sm text-gray-700 mt-2">{u.bio}</p>
//                 <p className="text-sm text-gray-700">{u.writingExperience}</p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Registered: {new Date(u.createdAt).toLocaleString()}
//                 </p>
//               </div>
//               <div className="flex gap-2 mt-3 md:mt-0">
//                 <button
//                   onClick={() => approveUser(u._id)}
//                   className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-1"
//                 >
//                   <Check size={16} /> Approve
//                 </button>
//                 <button
//                   onClick={() => rejectUser(u._id)}
//                   className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-1"
//                 >
//                   <X size={16} /> Reject
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }


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
      const users = await API.get("/admin/pending", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPendingUsers(users.data);

      const books = await API.get("/books/pending", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPendingBooks(books.data);
    } catch (err) {
      toast.error("Error loading dashboard");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const approveBook = async (id) => {
    try {
      await API.put(`/books/${id}/approve`);
      toast.success("✅ Book Approved & Published!");
      loadData();
    } catch {
      toast.error("Error approving");
    }
  };

  const rejectBook = async (id) => {
    try {
      await API.put(`/books/${id}/reject`);
      toast.error("❌ Book Rejected");
      loadData();
    } catch {
      toast.error("Error rejecting");
    }
  };

  const approveUser = async (id) => {
    try {
      await API.put(`/admin/${id}/approve`);
      toast.success("User Approved");
      loadData();
    } catch {
      toast.error("Error approving user");
    }
  };

  const rejectUser = async (id) => {
    try {
      await API.put(`/admin/${id}/reject`);
      toast.error("User Rejected");
      loadData();
    } catch {
      toast.error("Error rejecting user");
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
              <p className="text-xs text-gray-600">By: {b.author?.name}</p>
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

