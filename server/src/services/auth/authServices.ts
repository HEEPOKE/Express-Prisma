import { Request, Response } from "express";
import db from "../../config/db";
import { comparePassword } from "../../common/comparePassword";
import userServices from "../userServices";
import config from "../../config/config";

async function login(email: string, password: string, res: Response) {
  const checkEmail = await userServices.findEmail(email);

  if (!checkEmail) {
    let massage = {
      message: "Invalid email",
    };
    return res.status(401).json(massage);
  }

  const checkPassword = await comparePassword(checkEmail.password, password);

  if (!checkPassword) {
    let massage = {
      message: "Password Not Correct",
    };
    return res.status(401).json(massage);
  }

  return res.redirect(`${config.ENDPOINT}`);
}

const loginServices = { login };

export default loginServices;
