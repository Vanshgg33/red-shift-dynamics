import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import app from './app.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;

// Serve built frontend when dist/ exists (local production preview)
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  const { default: express } = await import('express');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

if (!process.env.MONGODB_URL) {
  console.error('❌  MONGODB_URL is not set in .env');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('✅  MongoDB connected');
    app.listen(PORT, () => console.log(`🚀  API server → http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌  MongoDB connection failed:', err.message);
    process.exit(1);
  });
