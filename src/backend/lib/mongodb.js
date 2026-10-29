import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const uri = process.env.MONGODB_URI || MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // Optimizations for serverless (Vercel)
      maxPoolSize: 5,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      socketTimeoutMS: 30000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e.message);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
