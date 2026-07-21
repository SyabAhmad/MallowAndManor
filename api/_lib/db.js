import mongoose from 'mongoose';

let cached = null;

const connectDB = async () => {
  if (cached) return cached;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI env var is not set');
  }

  // Mask password for logging
  const masked = uri.replace(/:([^@]+)@/, ':****@');
  console.log('Connecting to MongoDB:', masked.substring(0, 80) + '...');

  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });
  
  console.log('MongoDB connected:', conn.connection.host);
  cached = conn;
  return conn;
};

export default connectDB;
