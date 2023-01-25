import { Response } from "express";
import jwt from "jsonwebtoken";
import db from "../../config/db";
import config from "../../config/config";
import { comparePassword } from "../../common/comparePassword";
import userServices from "../userServices";

async function login(email: string, password: string, res: Response) {
  const user = await userServices.findEmail(email);

  if (!user) {
    let massage = {
      message: "Invalid email",
    };
    return res.status(401).json(massage);
  }

  const checkPassword = await comparePassword(user.password, password);

  if (!checkPassword) {
    let massage = {
      message: "Password Not Correct",
    };
    return res.status(401).json(massage);
  }

  const token = await jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    `${config.MY_SECRET_KEY}`,
    { expiresIn: 60 * 60 }
  );

  const payload = {
    message: "Success",
    payload: user,
    access_token: "Bearer " + token,
  };

  return res.redirect(`${config.ENDPOINT}/`);
}

async function register(payload: any) {
  return await db.user.create({
    data: payload,
  });
}

const authServices = { login, register };

export default authServices;
