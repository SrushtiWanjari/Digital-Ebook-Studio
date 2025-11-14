import User from '../models/User.js';
import Book from '../models/Book.js';
import { sendMail } from '../utils/emailService.js';

export const getPendingUsers = async (req, res) => {
  const users = await User.find({ status: 'pending' }).select('name email bio writingExperience createdAt');
  res.json(users);
};

export const approveUser = async (req, res) => {
  const u = await User.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
  if (!u) return res.status(404).json({ message: 'Not found' });
  try {
    await sendMail(u.email, 'Account Approved', `Hello ${u.name},\n\nYour account has been approved. You can now login.`);
  } catch(err) {
    console.error('Email error', err);
  }
  res.json({ message: 'Approved' });
};

export const rejectUser = async (req, res) => {
  const u = await User.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
  if (!u) return res.status(404).json({ message: 'Not found' });
  try {
    await sendMail(u.email, 'Account Rejected', `Hello ${u.name},\n\nYour registration has been rejected.`);
  } catch(err) {
    console.error('Email error', err);
  }
  res.json({ message: 'Rejected' });
};

export const getPendingBooks = async (req, res) => {
  const books = await Book.find({ status: 'submitted' }).populate('author','name email');
  res.json(books);
};

export const approveBook = async (req, res) => {
  const b = await Book.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
  if (!b) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Book approved' });
};

export const rejectBook = async (req, res) => {
  const b = await Book.findByIdAndUpdate(req.params.id, { status: 'draft' }, { new: true });
  if (!b) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Book rejected' });
};
