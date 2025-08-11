import rateLimit from 'express-rate-limit';

  //Strict rate limiting for authentication endpoints
  export const authLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // 5 attempts per window
      message: {
          error: "Too many login attempts, please try again later" 
      },
      standardHeaders: true,
      legacyHeaders: false,
  });

  //General API rate limiting
  export const apiLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // 100 requests per window
      message: {
          error: "Too many requests, please try again later"       
      }
  });