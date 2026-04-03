import app from '../src/app.js';   // adjust path if needed
import connectDB from '../src/config/db.js';

await connectDB();

export default app;