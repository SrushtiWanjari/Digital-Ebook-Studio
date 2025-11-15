// import Book from '../models/Book.js';

// export const createBook = async (req, res) => {
//   try {
//     const { title, pages, content, cover } = req.body;
//     const incomplete = await Book.countDocuments({ author: req.user._id, status: { $in: ['draft','submitted'] } });
//     if (incomplete >= 3) return res.status(400).json({ message: 'You have 3 incomplete books. Complete one first.' });
//     const book = await Book.create({ title, pages, content, cover, author: req.user._id });
//     res.json(book);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Create failed' });
//   }
// };

// export const updateBook = async (req, res) => {
//   try {
//     const b = await Book.findById(req.params.id);
//     if (!b) return res.status(404).json({ message: 'Not found' });
//     if (b.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
//     const { title, pages, content, cover, status } = req.body;
//     b.title = title ?? b.title;
//     b.pages = pages ?? b.pages;
//     b.content = content ?? b.content;
//     b.cover = cover ?? b.cover;
//     if (status) b.status = status;
//     await b.save();
//     res.json(b);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Update failed' });
//   }
// };

// export const myBooks = async (req, res) => {
//   const books = await Book.find({ author: req.user._id }).sort({ createdAt: -1 });
//   res.json(books);
// };

// export const publicBooks = async (req, res) => {
//   const books = await Book.find({ status: 'approved' }).populate('author','name');
//   res.json(books);
// };


import Book from "../models/Book.js";

// Create book (Draft)
export const createBook = async (req, res) => {
  try {
    const { title, pages, content, cover } = req.body;

    const incomplete = await Book.countDocuments({
      author: req.user._id,
      status: { $in: ["draft", "submitted"] }
    });

    if (incomplete >= 3)
      return res.status(400).json({ message: "You have 3 incomplete books." });

    const book = await Book.create({
      title,
      pages,
      content,
      cover,
      author: req.user._id,
      status: "draft"
    });

    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create failed" });
  }
};

// Update book (Save / Submit)
export const updateBook = async (req, res) => {
  try {
    const b = await Book.findById(req.params.id);
    if (!b) return res.status(404).json({ message: "Not found" });

    if (b.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden" });

    const { title, pages, content, cover, status } = req.body;

    if (title) b.title = title;
    if (pages) b.pages = pages;
    if (content) b.content = content;
    if (cover) b.cover = cover;
    if (status) b.status = status; // "draft" | "submitted"

    await b.save();
    res.json(b);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};

// Get my books
export const myBooks = async (req, res) => {
  const books = await Book.find({ author: req.user._id }).sort({ createdAt: -1 })
  res.json(books);
};

// Public approved books
export const publicBooks = async (req, res) => {
  const books = await Book.find({ status: "approved" }).populate("author", "name");
  res.json(books);
};

// ADMIN — get submitted books pending approval
export const adminGetPendingBooks = async (req, res) => {
  const books = await Book.find({ status: "submitted" }).populate("author", "name email").sort({ createdAt: -1 });
  res.json(books);
};

// ADMIN — approve book
export const adminApproveBook = async (req, res) => {
  const b = await Book.findById(req.params.id);
  if (!b) return res.status(404).json({ message: "Book not found" });

  b.status = "approved";
  await b.save();
  res.json({ message: "Book approved" });
};

// ADMIN — reject book
// ADMIN — reject book
export const adminRejectBook = async (req, res) => {
  const b = await Book.findById(req.params.id);
  if (!b) return res.status(404).json({ message: "Book not found" });

  // send back to draft so author edits again
  b.status = "draft";
  await b.save();

  res.json({ message: "Book rejected, moved back to draft" });
};

// Author Routes
// router.delete("/:id", async (req, res) => {
  
// });


export const deleteBook = async (req, res) => {
try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
}






