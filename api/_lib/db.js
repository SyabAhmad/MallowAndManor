import mongoose from 'mongoose';

let cached = null;

const connectDB = async () => {
  if (cached) return cached;

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI env var is not set');
  }

  const conn = await mongoose.connect(process.env.MONGODB_URI);
  cached = conn;
  return conn;
};

export default connectDB;
