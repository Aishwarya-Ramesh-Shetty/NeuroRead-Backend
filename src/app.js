import cors from 'cors';
import express from 'express';
import env from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/errorMiddleware.js';

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CORS_ORIGIN
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);
app.use(express.json({ limit: '1mb' }));
app.use('/public', express.static('public'));
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
