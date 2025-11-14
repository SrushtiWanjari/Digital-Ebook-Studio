import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  const url = process.env.MONGODB_URL;
  if (!url) throw new Error('MONGODB_URL not set in env');
  await mongoose.connect(url);
  console.log('MongoDB connected');
};
