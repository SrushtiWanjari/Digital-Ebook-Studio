import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  pages: Number,
  content: String,
  cover: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['draft','submitted','approved'], default: 'draft' }
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
