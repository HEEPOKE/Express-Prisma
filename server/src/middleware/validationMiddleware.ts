import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

function authenticateToken(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(500).json({ message: "Invalid Token" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(500).json({ message: "Invalid Token" });
  }

  try {
    const decoded = jwt.verify(token, `${config.MY_SECRET_KEY}`);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.sendStatus(403).json({ message: "Token Not Correct" });
  }
}

export default authenticateToken;
