import User from '../models/User.js';
import Book from '../models/Book.js';
import { sendEmail } from '../utils/sendEmail.js';

export const getPendingUsers = async (req, res) => {
  const users = await User.find({ status: 'pending' }).select('name email bio writingExperience createdAt');
  res.json(users);
};

export const approveUser = async (req, res) => {
  try {
    // Update user status to approved
    const u = await User.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!u) return res.status(404).json({ message: "User not found" });

    // Send approval email
    await sendEmail(
      u.email,
      "🎉 Account Approved — You Can Now Login",
      `
      <h2>Hello ${u.name},</h2>
      <p>Your account has been <b>approved by the admin</b>.</p>
      <p>You can now log in and start using your dashboard.</p>
      <br/>
      <a href="https://your-frontend-url.com/login"
         style="padding:10px 18px;background:#6a4dff;color:white;text-decoration:none;border-radius:6px;">
         Login Now
      </a>
      <br/><br/>
      <p>Thank you for being part of our platform 💙</p>
      `
    );

    return res.json({ message: "User approved & email sent successfully" });

  } catch (error) {
    console.error("Approval email sending failed:", error);
    return res.json({ message: "User approved, but email failed to send" });
  }
};

export const rejectUser = async (req, res) => {
  const u = await User.findByIdAndUpdate(
    req.params.id,
    { status: "rejected" },
    { new: true }
  );

  if (!u) return res.status(404).json({ message: "User not found" });

  try {
    await sendEmail(
      u.email,
      "❌ Account Registration Rejected",
      `
      <div style="font-family: Arial; line-height: 1.5;">
        <h2 style="color: #b00020;">Digital Ebook Studio</h2>
        <p>Hi <b>${u.name}</b>,</p>
        <p>Thank you for showing interest in joining Digital Ebook Studio.</p>
        <p>After reviewing your registration details, we regret to inform you that your account request has been <b style="color:#b00020;">rejected</b>.</p>
        
        <p>If you believe this was a mistake or you wish to re-apply, feel free to contact our support team.</p>

        <br/>
        <p>📩 <b>Support Email:</b> digitale.book@gmail.com</p>
        
        <br/>
        <p>Regards,</p>
        <p><b>Digital Ebook Studio Team</b></p>
        <hr/>
        <small style="color: #555;">
          This is an automated email. Please do not reply to this message.
        </small>
      </div>
      `
    );
  } catch (err) {
    console.error("Email error", err);
  }

  res.json({ message: "User rejected & email sent" });
};



// export const rejectUser = async (req, res) => {
//   const u = await User.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
//   if (!u) return res.status(404).json({ message: 'Not found' });
//   try {
//     await sendMail(u.email, 'Account Rejected', `Hello ${u.name},\n\nYour registration has been rejected.`);
//   } catch(err) {
//     console.error('Email error', err);
//   }
//   res.json({ message: 'Rejected' });
// };

export const getPendingBooks = async (req, res) => {
  const books = await Book.find({ status: 'submitted' }).populate('author','name email');
  res.json(books);
};

// export const approveBook = async (req, res) => {
//   const b = await Book.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
//   if (!b) return res.status(404).json({ message: 'Not found' });
//   res.json({ message: 'Book approved' });
// };


export const approveBook = async (req, res) => {
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


export const rejectBook = async (req, res) => {
  const b = await Book.findById(req.params.id).populate("author", "name email");
  if (!b) return res.status(404).json({ message: "Book not found" });

  // Change status back to draft so author can edit again
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

// export const rejectBook = async (req, res) => {
//   const b = await Book.findByIdAndUpdate(req.params.id, { status: 'draft' }, { new: true });
//   if (!b) return res.status(404).json({ message: 'Not found' });
//   res.json({ message: 'Book rejected' });
// };
