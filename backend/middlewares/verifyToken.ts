import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies?.token;
      
      if (!token) {
          return res.status(401).json({ message: "Access token required" });
      }

      const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
      if (!ACCESS_TOKEN_SECRET) {
          return res.status(500).json({ message: "Server configuration error" });
      }

      jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
          if (err) {
              return res.status(403).json({ message: "Invalid or expired token" });
          }

          req.user = decoded;
          next();
      });
  };

// Optional authentication - extracts user if logged in, but doesn't block unauthenticated users
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    
    if (!token) {
        // No token, continue without user
        req.user = undefined;
        return next();
    }

    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    if (!ACCESS_TOKEN_SECRET) {
        // Server config error, but don't block the request
        req.user = undefined;
        return next();
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
        if (err) {
            // Invalid token, but don't block - just continue without user
            req.user = undefined;
        } else {
            // Valid token - set the user
            req.user = decoded;
        }
        next();
    });
};