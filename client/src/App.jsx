import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AuthorDashboard from "./pages/AuthorDashboard";
import Explore from "./pages/Explore";
import SavedBooks from "./pages/SavedBooks";
import { ToastContainer } from "react-toastify";
import Reviews from "./pages/ReviewPage";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/author" element={<AuthorDashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/saved" element={<SavedBooks />} />
         <Route path="/reviews" element={<Reviews />} />
      </Routes>
      <ToastContainer position="top-right" />
    </>
  );
}
