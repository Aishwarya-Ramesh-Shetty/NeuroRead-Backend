import mongoose from 'mongoose';
import env from './env.js';

let isConnected = false;

const connectDB = async () => {
  // Check if we are already connected (especially important for Vercel's reuse)
  if (mongoose.connection.readyState === 1) {
    console.log("Using existing DB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(env.mongoUri, {
      autoIndex: true
    });
    
    isConnected = conn.connections[0].readyState === 1;
    console.log('MongoDB connected successfully');
  } catch (error) {
    const details = error?.message || 'Unknown MongoDB connection error';

    if (/option\s+.+\s+is not supported/i.test(details)) {
      throw new Error(
        `MongoDB connection failed: ${details}. Check MONGO_URI query parameters.`
      );
    }

    throw new Error(`MongoDB connection failed: ${details}`);
  }
};

export default connectDB;