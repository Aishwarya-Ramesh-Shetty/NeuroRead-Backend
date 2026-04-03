import cors from 'cors';
import express from 'express';
import env from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/errorMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';



const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CORS_ORIGIN,
  "https://neuro-read-backend.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true
  })
);
app.use(express.json({ limit: '1mb' }));
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Change your static middleware to this:
app.use('/public', express.static(path.join(process.cwd(), 'public')));
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server healthy' });
});
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running 🚀'
  });
});
app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
