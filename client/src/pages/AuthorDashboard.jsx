// import React, { useEffect, useState } from "react";
// import API, { setAuthToken } from "../lib/api";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import { Book, PlusCircle, Save, CheckCircle } from "lucide-react";

// export default function AuthorDashboard() {
//   const [books, setBooks] = useState([]);
//   const [title, setTitle] = useState("");
//   const [pages, setPages] = useState(1);
//   const [content, setContent] = useState("");
//   const [cover, setCover] = useState("");

//   const token = localStorage.getItem("token");
//   if (token) setAuthToken(token);

//   const fetchBooks = async () => {
//     try {
//       const { data } = await API.get("/books/my");
//       setBooks(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/books", { title, pages, content, cover });
//       toast.success("📚 Book created successfully!");
//       setTitle("");
//       setPages(1);
//       setContent("");
//       setCover("");
//       fetchBooks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Create failed");
//     }
//   };

//   const handleSave = async (book) => {
//     try {
//       await API.put(`/books/${book._id}`, {
//         title: book.title,
//         pages: book.pages,
//         content: book.content,
//         status: book.status,
//       });
//       toast.success("✅ Saved!");
//       fetchBooks();
//     } catch (err) {
//       toast.error("Save failed");
//     }
//   };

//   const uploadCover = (file) => {
//     const reader = new FileReader();
//     reader.onload = () => setCover(reader.result);
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 overflow-y-auto relative">
//       <motion.h2
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-extrabold text-white mb-8 flex items-center gap-2"
//       >
//         <Book /> Author Dashboard
//       </motion.h2>

//       <div className="grid md:grid-cols-2 gap-8">
//         <motion.form
//           onSubmit={handleCreate}
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white/70 backdrop-blur-xl border border-white/40 p-6 rounded-2xl shadow-xl space-y-4"
//         >
//           <h3 className="text-lg font-bold text-indigo-700 flex items-center gap-2">
//             <PlusCircle /> Create New Book
//           </h3>
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Book Title"
//             className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
//             required
//           />
//           <input
//             type="number"
//             value={pages}
//             onChange={(e) => setPages(Number(e.target.value))}
//             min="1"
//             className="w-full p-2 border rounded-lg"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => uploadCover(e.target.files[0])}
//             className="w-full text-sm"
//           />
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows="5"
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300"
//             placeholder="Write your book content..."
//           />
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow-md"
//           >
//             Create Book
//           </motion.button>
//         </motion.form>

//         <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
//           <h3 className="text-lg font-bold text-white">Your Books</h3>
//           {books.map((b) => (
//             <motion.div
//               key={b._id}
//               initial={{ opacity: 0, scale: 0.96 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="bg-white/80 backdrop-blur-xl border border-white/40 p-4 rounded-xl shadow"
//             >
//               <div className="flex gap-4">
//                 {b.cover ? (
//                   <img
//                     src={b.cover}
//                     alt="cover"
//                     className="w-20 h-28 object-cover rounded-lg"
//                   />
//                 ) : (
//                   <div className="w-20 h-28 bg-gray-200 flex items-center justify-center rounded-lg text-xs">
//                     No Cover
//                   </div>
//                 )}
//                 <div className="flex-1">
//                   <input
//                     value={b.title}
//                     onChange={(e) => {
//                       b.title = e.target.value;
//                       setBooks([...books]);
//                     }}
//                     className="w-full font-semibold bg-transparent border-b pb-1"
//                   />
//                   <div className="text-sm text-gray-600 mt-1">
//                     Pages:{" "}
//                     <input
//                       type="number"
//                       value={b.pages}
//                       onChange={(e) => {
//                         b.pages = e.target.value;
//                         setBooks([...books]);
//                       }}
//                       className="w-20 ml-2 p-1 bg-white/60 border rounded"
//                     />
//                   </div>
//                   <textarea
//                     rows="3"
//                     value={b.content}
//                     onChange={(e) => {
//                       b.content = e.target.value;
//                       setBooks([...books]);
//                     }}
//                     className="w-full mt-2 p-2 bg-white/70 border rounded"
//                   ></textarea>
//                   <div className="flex gap-2 mt-3">
//                     <button
//                       onClick={() => handleSave(b)}
//                       className="flex items-center gap-1 px-3 py-1 rounded bg-indigo-600 text-white text-sm shadow"
//                     >
//                       <Save size={16} /> Save
//                     </button>
//                     <button
//                       onClick={async () => {
//                         await API.put(`/books/${b._id}`, {
//                           status: "submitted",
//                         });
//                         toast.success("Submitted for review");
//                         fetchBooks();
//                       }}
//                       className="flex items-center gap-1 px-3 py-1 rounded bg-green-600 text-white text-sm shadow"
//                     >
//                       <CheckCircle size={16} /> Submit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import API, { setAuthToken } from "../lib/api";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Book,
//   PlusCircle,
//   Save,
//   CheckCircle,
//   LogOut,
//   Home,
//   FolderOpen,
//   UserCircle
// } from "lucide-react";

// export default function AuthorDashboard() {
//   const [books, setBooks] = useState([]);
//   const [title, setTitle] = useState("");
//   const [pages, setPages] = useState(1);
//   const [content, setContent] = useState("");
//   const [cover, setCover] = useState("");

//   const nav = useNavigate();
//   const token = localStorage.getItem("token");
//   if (token) setAuthToken(token);

//   const fetchBooks = async () => {
//     try {
//       const { data } = await API.get("/books/my");
//       setBooks(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const incompleteBooks = books.filter((b) => b.status !== "approved");

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleCreate = async (e) => {
//     e.preventDefault();

//     if (incompleteBooks.length >= 3) {
//       return toast.warning("❗ You can only have 3 incomplete books!");
//     }

//     try {
//       await API.post("/books", { title, pages, content, cover });
//       toast.success("📚 Book draft created!");

//       setTitle("");
//       setPages(1);
//       setContent("");
//       setCover("");

//       fetchBooks();
//     } catch (err) {
//       toast.error("Error creating book");
//     }
//   };

//   const handleSave = async (book) => {
//     try {
//       await API.put(`/books/${book._id}`, book);
//       toast.success("✅ Draft Saved");
//       fetchBooks();
//     } catch (err) {
//       toast.error("Save failed");
//     }
//   };

//   const handleSubmitBook = async (id) => {
//     try {
//       await API.put(`/books/${id}`, { status: "submitted" });
//       toast.success("📩 Submitted for admin approval");
//       fetchBooks();
//     } catch (err) {
//       toast.error("Submit failed");
//     }
//   };

//   const uploadCover = (file) => {
//     const reader = new FileReader();
//     reader.onload = () => setCover(reader.result);
//     reader.readAsDataURL(file);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     toast.info("Logged out");
//     nav("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">

//       {/* ✅ Navbar */}
//       <div className="flex justify-between bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-4 text-white mb-8 shadow-lg">
//         <div className="flex gap-6 items-center">
//           <Home size={22} />
//           <span className="font-bold text-lg">Author Dashboard</span>
//         </div>

//         <div className="flex gap-4">
//           <Link to="/explore" className="hover:text-yellow-300">Explore</Link>
//           <Link to="/saved" className="hover:text-yellow-300">Saved Books</Link>
//           <Link to="/profile" className="hover:text-yellow-300">Profile</Link>
//           <button onClick={logout} className="flex items-center gap-1 hover:text-red-300">
//             <LogOut size={18} /> Logout
//           </button>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-8">

//         {/* ✅ Create Book Form */}
//         <motion.form
//           onSubmit={handleCreate}
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/40 space-y-4"
//         >
//           <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-700">
//             <PlusCircle /> Create New Book
//           </h3>

//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Book Title"
//             className="w-full p-2 border rounded-lg"
//             required
//           />

//           <input
//             type="number"
//             value={pages}
//             onChange={(e) => setPages(Number(e.target.value))}
//             min="1"
//             className="w-full p-2 border rounded-lg"
//           />

//           <input type="file" accept="image/*" onChange={(e) => uploadCover(e.target.files[0])} />

//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows="5"
//             className="w-full p-3 border rounded-lg"
//             placeholder="Write your story..."
//           />

//           <motion.button whileTap={{ scale: 0.95 }} className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow">
//             Save Draft
//           </motion.button>
//         </motion.form>

//         {/* ✅ Book List */}
//         <div className="space-y-4 max-h-[70vh] overflow-y-auto">
//           <h3 className="text-lg font-bold text-white flex items-center gap-2"><FolderOpen /> Your Books</h3>

//           {books.map((b) => (
//             <motion.div
//               key={b._id}
//               initial={{ opacity: 0, scale: 0.96 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="bg-white/85 border border-white/40 backdrop-blur-xl p-4 rounded-xl shadow"
//             >
//               <div className="flex gap-4">

//                 {b.cover ? (
//                   <img src={b.cover} alt="cover" className="w-20 h-28 object-cover rounded-lg" />
//                 ) : (
//                   <div className="w-20 h-28 bg-gray-200 flex items-center justify-center rounded-lg text-xs">No Cover</div>
//                 )}

//                 <div className="flex-1">
//                   <input
//                     value={b.title}
//                     onChange={(e) => { b.title = e.target.value; setBooks([...books]); }}
//                     className="w-full font-semibold border-b bg-transparent pb-1"
//                   />

//                   <textarea
//                     rows="3"
//                     value={b.content}
//                     onChange={(e) => { b.content = e.target.value; setBooks([...books]); }}
//                     className="w-full mt-2 p-2 border rounded"
//                   />

//                   <div className="flex gap-2 mt-3">
//                     {/* Save */}
//                     <button onClick={() => handleSave(b)} className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white text-sm rounded shadow">
//                       <Save size={14} /> Save
//                     </button>

//                     {/* Submit */}
//                     {b.status !== "submitted" && (
//                       <button onClick={() => handleSubmitBook(b._id)} className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded shadow">
//                         <CheckCircle size={14} /> Submit
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import API, { setAuthToken } from "../lib/api";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   PlusCircle,
//   Save,
//   CheckCircle,
//   LogOut,
//   Home,
//   FolderOpen
// } from "lucide-react";

// export default function AuthorDashboard() {
//   const [books, setBooks] = useState([]);
//   const [title, setTitle] = useState("");
//   const [pages, setPages] = useState(1);
//   const [content, setContent] = useState("");
//   const [cover, setCover] = useState("");

//   const nav = useNavigate();
//   const token = localStorage.getItem("token");
//   if (token) setAuthToken(token);

//   const fetchBooks = async () => {
//     try {
//       const { data } = await API.get("/books/my");
//       setBooks(data);
//     } catch {
//       toast.error("Error loading books");
//     }
//   };

//   const incompleteBooks = books.filter((b) => b.status !== "approved");

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleCreate = async (e) => {
//     e.preventDefault();

//     if (incompleteBooks.length >= 3)
//       return toast.warning("❗ You can only have 3 incomplete books!");

//     try {
//       await API.post("/books", { title, pages, content, cover });
//       toast.success("📚 Draft Created!");

//       setTitle("");
//       setPages(1);
//       setContent("");
//       setCover("");

//       fetchBooks();
//     } catch {
//       toast.error("Create failed");
//     }
//   };

//   const handleSave = async (book) => {
//     try {
//       await API.put(`/books/${book._id}`, {
//         title: book.title,
//         pages: book.pages,
//         content: book.content,
//         cover: book.cover,
//         status: "draft"
//       });
//       toast.success("✅ Draft Saved");
//       fetchBooks();
//     } catch {
//       toast.error("Save failed");
//     }
//   };

//   const handleSubmitBook = async (id) => {
//     try {
//       await API.put(`/books/${id}`, { status: "submitted" });
//       toast.success("📩 Sent for Admin Review");
//       fetchBooks();
//     } catch {
//       toast.error("Submit failed");
//     }
//   };

//   const uploadCover = (file, book = null) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (book) {
//         book.cover = reader.result;
//         setBooks([...books]);
//       } else {
//         setCover(reader.result);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     toast.info("Logged out");
//     nav("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">

//       {/* ✅ Navbar */}
//       <div className="flex justify-between bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-4 text-white mb-8 shadow-lg">
//         <div className="flex gap-6 items-center">
//           <Home size={22} />
//           <span className="font-bold text-lg">Author Dashboard</span>
//         </div>

//         <div className="flex gap-5 justify-center items-center">
//           <Link to="/explore" className="hover:text-yellow-300 font-semibold">Explore</Link>
//           <Link to="/saved" className="hover:text-yellow-300 font-semibold">Saved Drafts</Link>
//           <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:animate-pulse transition font-medium shadow"  >
//             <LogOut size={18} /> Logout
//           </button>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-8">

//         {/* ✅ Create Book Form */}
//         <motion.form
//           onSubmit={handleCreate}
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/40 space-y-4"
//         >
//           <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-700">
//             <PlusCircle /> Create New Book
//           </h3>

//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Book Title"
//             className="w-full p-2 border rounded-lg"
//             required
//           />

//           <input
//             type="number"
//             value={pages}
//             min="1"
//             onChange={(e) => setPages(Number(e.target.value))}
//             className="w-full p-2 border rounded-lg"
//           />

//           <input type="file" accept="image/*" onChange={(e) => uploadCover(e.target.files[0])} />

//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows="5"
//             className="w-full p-3 border rounded-lg"
//             placeholder="Write your story..."
//           />

//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow"
//           >
//             Create Draft
//           </motion.button>
//         </motion.form>

//         {/* ✅ Book List */}
//         <div className="space-y-4 max-h-[70vh] overflow-y-auto">
//           <h3 className="text-lg font-bold text-white flex items-center gap-2"><FolderOpen /> Your Books</h3>

//           {books?.map((b) => (
//             <motion.div
//               key={b._id}
//               initial={{ opacity: 0, scale: 0.96 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="bg-white/85 border border-white/40 backdrop-blur-xl p-4 rounded-xl shadow"
//             >
//               <div className="flex gap-4">

//                 {b.cover ? (
//                   <img src={b.cover} alt="cover" className="w-20 h-28 object-cover rounded-lg" />
//                 ) : (
//                   <div className="w-20 h-28 bg-gray-200 flex items-center justify-center rounded-lg text-xs">No Cover</div>
//                 )}

//                 <div className="flex-1">
//                   {/* Prevent edit if approved */}
//                   <input
//                     disabled={b.status === "approved"}
//                     value={b.title}
//                     onChange={(e) => { b.title = e.target.value; setBooks([...books]); }}
//                     className="w-full font-semibold border-b bg-transparent pb-1"
//                   />

//                   <textarea
//                     rows="3"
//                     disabled={b.status === "approved"}
//                     value={b.content}
//                     onChange={(e) => { b.content = e.target.value; setBooks([...books]); }}
//                     className="w-full mt-2 p-2 border rounded"
//                   />

//                   {b.status !== "approved" && (
//                     <input type="file" accept="image/*" onChange={(e) => uploadCover(e.target.files[0], b)} />
//                   )}

//                   <div className="flex gap-2 mt-3">

//                     {/* Save */}
//                     {b.status !== "submitted" && b.status !== "approved" && (
//                       <button onClick={() => handleSave(b)} className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white text-sm rounded shadow">
//                         <Save size={14} /> Save
//                       </button>
//                     )}

//                     {/* Submit */}
//                     {b.status === "draft" && (
//                       <button onClick={() => handleSubmitBook(b._id)} className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded shadow">
//                         <CheckCircle size={14} /> Submit
//                       </button>
//                     )}

//                     {b.status === "submitted" && (
//                       <span className="text-sm text-yellow-600 font-semibold">Pending approval...</span>
//                     )}

//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import API, { setAuthToken } from "../lib/api";
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
  Trash2
} from "lucide-react";
import Swal from "sweetalert2"; // ✅ SweetAlert2 for stylish confirmation dialogs

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
      await API.put(`/books/${id}`, { status: "submitted" });
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
  const handleDelete = async (bookId) => {
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
      await API.delete(`/books/${bookId}`);
      setBooks((prev) => prev.filter((b) => b._id !== bookId));

      Swal.fire({
        title: "Deleted!",
        text: "Your book has been removed successfully.",
        icon: "success",
        background: "#1e1e2f",
        color: "#fff",
        timer: 1500,
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
          <Link to="/explore" className="hover:text-yellow-300 font-semibold">Explore</Link>
          <Link to="/saved" className="hover:text-yellow-300 font-semibold">Saved Drafts</Link>
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

          <input type="file" accept="image/*" onChange={(e) => uploadCover(e.target.files[0])} />

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
                  <img src={b.cover} alt="cover" className="w-20 h-28 object-cover rounded-lg" />
                ) : (
                  <div className="w-20 h-28 bg-gray-200 flex items-center justify-center rounded-lg text-xs">
                    No Cover
                  </div>
                )}

                <div className="flex-1">
                  <input
                    disabled={b.status === "approved"}
                    value={b.title}
                    onChange={(e) => { b.title = e.target.value; setBooks([...books]); }}
                    className="w-full font-semibold border-b bg-transparent pb-1"
                  />

                  <textarea
                    rows="3"
                    disabled={b.status === "approved"}
                    value={b.content}
                    onChange={(e) => { b.content = e.target.value; setBooks([...books]); }}
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
                    {/* Save */}
                    {b.status !== "submitted" && b.status !== "approved" && (
                      <button
                        onClick={() => handleSave(b)}
                        className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white text-sm rounded shadow hover:bg-indigo-700 transition"
                      >
                        <Save size={14} /> Save
                      </button>
                    )}

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
