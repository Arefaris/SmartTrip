import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies?.token;
      
      if (!token) {
          return res.status(401).json({ message: "Access token required" });
      }

      const ACCESS_TOKEN_SECRET = process.env.ACCES_TOKEN_SECRET;
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