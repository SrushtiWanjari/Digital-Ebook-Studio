import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './db.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

const run = async ()=> {
  await connectDB();
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@local';
  const exists = await User.findOne({ email });
  if (exists) { console.log('admin exists'); process.exit(0); }
  const hashed = await bcrypt.hash(process.env.SEED_ADMIN_PASS || 'adminpass', 10);
  const u = await User.create({ name: 'Admin', email, password: hashed, role: 'admin', status: 'approved' });
  console.log('Admin created:', u.email);
  process.exit(0);
};

run();
