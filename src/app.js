import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./middlewares/error.middleware.js";
import rateLimiter from "./middlewares/rateLimit.middleware.js";

const app = express();

// Security
app.use(helmet());
app.use(cors());
app.use(rateLimiter);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", uptime: process.uptime() });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
