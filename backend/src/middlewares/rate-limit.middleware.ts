import rateLimit from 'express-rate-limit';

export const analyzeRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 30,                   // 30 requests por IP por ventana
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { message: 'Too many requests, please try again later.' } }
});
