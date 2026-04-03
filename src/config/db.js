import mongoose from 'mongoose';
import env from './env.js';
let isConnected = false;
const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing DB connection");
    return;
  }
  try {
    await mongoose.connect(env.mongoUri, {
      autoIndex: true
    });
    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB connected successfully');
  } catch (error) {
    const details = error?.message || 'Unknown MongoDB connection error';

    if (/option\s+.+\s+is not supported/i.test(details)) {
      throw new Error(
        `MongoDB connection failed: ${details}. Check MONGO_URI query parameters in backend/.env. ` +
          'Your URI likely contains an invalid option key (for example a stray word after ? or &).'
      );
    }

    throw new Error(`MongoDB connection failed: ${details}`);
  }
};

export default connectDB;
