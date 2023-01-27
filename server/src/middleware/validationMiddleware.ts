import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

function authenticateToken(req: any, res: Response, next: NextFunction) {
  const token = req.headers.authorization ?? false;

  if (!token) {
    return res.status(500).json({ message: "Invalid Token form header" });
  }
  const tokenSplit = token.split(" ")[1];
  if (!tokenSplit) {
    return res.status(500).json({ message: "Invalid Token split form header" });
  }

  try {
    const decoded = jwt.verify(tokenSplit, `${config.MY_SECRET_KEY}`);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.sendStatus(403).json({ message: "Token Not Correct" });
  }
}

const RefreshTokenValidate = (req: any, res: Response, next: NextFunction) => {
  try {
    const getToken = req.headers.authorization ?? false;

    if (!getToken) {
      return res.status(500).json({ message: "Invalid Token form header" });
    }

    const token = getToken.split(" ")[1];

    jwt.verify(token, `${config.MY_REFRESH_KEY}`, (err: any, decoded: any) => {
      if (err) throw new Error(err);

      req.user = decoded;
      req.user.token = token;
      delete req.user.exp;
      delete req.user.iat;
    });
    next();
  } catch (error) {
    return res.sendStatus(403).json({ message: "Token Not Correct" });
  }
};

export default authenticateToken;
