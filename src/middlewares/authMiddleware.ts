import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../helpers/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ message: "No token provided", success: false });

  if (!authHeader.startsWith("Bearer "))
    return res.status(401).json({ error: "Bearer missing" });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "No token provided", success: false });

  // Verify token logic here
  try {
    const decoded = verifyToken(token) as JwtPayload;
    const user = decoded.user;
    (req as any).user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

