import express from "express";
import {
  getPendingUsers,
  approveUser,
  rejectUser,
  getPendingBooks,
  approveBook,
  rejectBook,
} from "../controllers/adminController.js";
import { auth, adminOnly } from "../middleware/auth.js";

const router = express.Router();


router.get("/pending", auth, adminOnly, getPendingUsers);
router.put("/:id/approve", auth, adminOnly, approveUser);
router.put("/:id/reject", auth, adminOnly, rejectUser);


router.get("/books/admin/pending", auth, adminOnly, getPendingBooks);
router.put("/books/admin/:id/approve", auth, adminOnly, approveBook);
router.put("/books/admin/:id/reject", auth, adminOnly, rejectBook);

export default router;
