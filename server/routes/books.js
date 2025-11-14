// import express from "express";
// import {
//   createBook,
//   updateBook,
//   myBooks,
//   publicBooks,
// } from "../controllers/bookController.js";
// import { auth } from "../middleware/auth.js";
// const router = express.Router();
// router.post("/", auth, createBook);
// router.put("/:id", auth, updateBook);
// router.get("/my", auth, myBooks);
// router.get("/public", publicBooks);
// export default router;

import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createBook,
  updateBook,
  myBooks,
  publicBooks,
  adminGetPendingBooks,
  adminApproveBook,
  adminRejectBook
} from "../controllers/bookController.js";

const router = express.Router();

// Author Routes
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

router.post("/", auth, createBook);
router.put("/:id", auth, updateBook);
router.get("/my", auth, myBooks);

// Public & Admin
router.get("/public", publicBooks);

// Admin Routes to approve books
router.get("/admin/pending", auth, adminGetPendingBooks);
router.put("/admin/:id/approve", auth, adminApproveBook);
router.put("/admin/:id/reject", auth, adminRejectBook);




export default router;
