# Timeless Treasure - MERN eBook Maker (Prototype)

This repository is a packaged prototype (frontend + backend) matching the project flow:
- Admin + Author modules
- Admin approves/rejects user registrations and books
- Email notifications on approve/reject (nodemailer)
- Authors can create/edit books; limit of 3 incomplete books
- Theme: Purple-Blue Glass (Tailwind), Framer Motion, Lucide icons, react-toastify

## Quick start

1. Extract the zip.
2. Backend:
   - cd server
   - npm install
   - copy `.env.example` to `.env` and fill values (MONGODB_URL, JWT_SECRET, EMAIL_*)
   - node seed-admin.js
   - npm run dev
3. Frontend:
   - cd client
   - npm install
   - npm run dev
4. Open http://localhost:5173 (client) and http://localhost:8080 (api)

Notes:
- This is a starter full-stack template. For production, configure secure email, HTTPS, and storage for uploaded files.
