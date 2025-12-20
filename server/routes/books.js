import express from "express";
import { auth, adminOnly } from "../middleware/auth.js";
import {
  createBook,
  updateBook,
  myBooks,
  publicBooks,
  adminGetPendingBooks,
  adminApproveBook,
  adminRejectBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();


router.post("/", auth, createBook);
router.put("/:id", auth, updateBook);
router.get("/my", auth, myBooks);
router.delete("/delete/:id", auth, deleteBook); 


router.get("/public", publicBooks);


router.get("/admin/pending", auth, adminOnly, adminGetPendingBooks);
router.put("/admin/:id/approve", auth, adminOnly, adminApproveBook);
router.put("/admin/:id/reject", auth, adminOnly, adminRejectBook);

export default router;
