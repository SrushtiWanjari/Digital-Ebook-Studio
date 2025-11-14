import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import bookRoutes from './routes/books.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));


app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/books', bookRoutes);



const start = async ()=> {
  await connectDB();
  const port = process.env.PORT || 8080;
  app.listen(port, ()=> console.log('Server running on', port));
};

start();
