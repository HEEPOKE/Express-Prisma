import { Request, Response } from "express";
import db from "../../config/db";
import { comparePassword } from "src/common/comparePassword";
import userServices from "../userServices";

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
}

const loginServices = { login };

export default loginServices;
