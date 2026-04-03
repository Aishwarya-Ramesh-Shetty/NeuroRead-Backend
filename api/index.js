import app from '../src/app.js';
import connectDB from '../src/config/db.js';

// Initialize DB connection but don't let it block the entire export if possible
// Or ensure it's wrapped in a try/catch
try {
    await connectDB();
} catch (err) {
    console.error("Database connection failed:", err);
}

export default app;