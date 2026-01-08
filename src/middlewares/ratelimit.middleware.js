import rateLimit from "express-rate-limit";

/**
 * IMPORTANT:
 * - Limiter MUST be created once
 * - Must be a plain object
 * - Must be exported as middleware
 */

// 🔓 Public (anonymous) APIs
export const publicRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50,               // v7+ uses `limit`, not `max`
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    message: "Too many requests. Please try again later."
  }
});

// 🔐 Authenticated APIs
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: "draft-7",
  legacyHeaders: false
});
