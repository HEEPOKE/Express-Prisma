import * as jwt from "jsonwebtoken";
import config from "../config/config";
import JwtPayload from "../models/jwtPayload";

const decodedToken = (token: string) => {
  const decoded = jwt.verify(token, `${config.MY_SECRET_KEY}`) as JwtPayload;
  const tokenExp = decoded.exp;

  return tokenExp;
};

export default decodedToken;
