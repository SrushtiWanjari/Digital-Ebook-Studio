import Book from "../models/Book.js";
import { sendEmail } from "../utils/sendEmail.js";

// Create book (Draft)
export const createBook = async (req, res) => {
  try {
    const { title,  content, cover } = req.body;

    const incomplete = await Book.countDocuments({
      author: req.user._id,
      status: { $in: ["draft", "submitted"] },
    });

    if (incomplete >= 3)
      return res.status(400).json({ message: "You have 3 incomplete books." });

    const book = await Book.create({
      title,
      // pages,
      content,
      cover,
      author: req.user._id,
      status: "draft",
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

    const { title, content, cover, status } = req.body;

    if (title) b.title = title;
    // if (pages) b.pages = pages;
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
  const books = await Book.find({ author: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(books);
};

// Public approved books
export const publicBooks = async (req, res) => {
  const books = await Book.find({ status: "approved" }).populate(
    "author",
    "name"
  );
  res.json(books);
};

// ADMIN — get submitted books pending approval
export const adminGetPendingBooks = async (req, res) => {
  const books = await Book.find({ status: "submitted" })
    .populate("author", "name email")
    .sort({ createdAt: -1 });
  res.json(books);
};

// ADMIN — approve book
export const adminApproveBook = async (req, res) => {
  const b = await Book.findById(req.params.id).populate("author", "name email");
  if (!b) return res.status(404).json({ message: "Book not found" });

  b.status = "approved";
  await b.save();

  try {
    await sendEmail(
      b.author.email,
      "🎉 Your Book Has Been Approved!",
      `
        <div style="font-family: Arial; line-height: 1.6;">
          <h2 style="color:#4CAF50;">Digital Ebook Studio</h2>
  
          <p>Hi <b>${b.author.name}</b>,</p>
          <p>Great news! Your book titled <b>"${b.title}"</b> has been successfully reviewed and <b style="color:#4CAF50;">approved for publishing</b>.</p>
  
          <p>📚 Your book is now <b>live and visible to all users</b> in the ebooks library.</p>
  
          <br/>
          <p>🔍 <b>Next Step:</b> You can promote and share your book with others.</p>
  
          <br/>
          <p>We're proud to have you as an author on our platform. Keep creating amazing content!</p>
  
          <p>🚀 <b>Continue writing your next masterpiece!</b></p>
  
          <br/>
          <p>Regards,</p>
          <p><b>Digital Ebook Studio Team</b></p>
  
          <hr/>
          <small style="color:#666;">This is an automated email — please do not reply.</small>
        </div>
        `
    );
  } catch (err) {
    console.error("Email Error →", err);
  }
  res.json({ message: "Book approved & approval email sent" });
};

// ADMIN — reject book

export const adminRejectBook = async (req, res) => {
  const b = await Book.findById(req.params.id).populate("author", "name email");
  if (!b) return res.status(404).json({ message: "Book not found" });

  // send back to draft so author edits again
  b.status = "draft";
  await b.save();

  try {
    await sendEmail(
      b.author.email,
      "❌ Book Submission Rejected",
      `
      <div style="font-family: Arial; line-height: 1.6;">
        <h2 style="color:#B00020;">Digital Ebook Studio</h2>
        <p>Hi <b>${b.author.name}</b>,</p>
        <p>We appreciate your effort in submitting your book <b>"${b.title}"</b> for review.</p>

        <p>However, after evaluation, your submission has been <b style="color:#B00020;">rejected</b> for now.</p>
        <p>Your book is moved back to <b>Draft</b> status so that you can edit and improve it.</p>

        <p>You may resubmit it anytime after making the required changes.</p>

        <br/>
        <p>🔁 <b>Next Step:</b> Go to your Author Dashboard → Edit Book → Resubmit</p>
        
        <br/>
        <p>If you need help or want clarification about the rejection reason, feel free to contact us.</p>
        <p>📩 <b>Support Email:</b> digitale.book@gmail.com</p>

        <br/>
        <p>Regards,</p>
        <p><b>Digital Ebook Studio Team</b></p>

        <hr/>
        <small style="color:#666;">This is an automated email — please do not reply.</small>
      </div>
      `
    );
  } catch (err) {
    console.error("Email Error →", err);
  }

  res.json({ message: "Book rejected & email sent to author" });
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
};
