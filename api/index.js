import mongoose from 'mongoose';
import app from '../server/app.js';

// Cache the connection across warm serverless invocations
let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }
  await mongoose.connect(process.env.MONGODB_URL);
  isConnected = true;
};

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
