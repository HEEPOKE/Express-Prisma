import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

interface AuthRequest extends Request {
  user: any;
}

function authToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(500).json({ message: "Invalid Token" });
  }
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(500).json({ message: "Invalid Token" });
  }

  try {
    const user = jwt.verify(token, `${config.MY_SECRET_KEY}`);
    req.user = user;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
}

export default authToken;
