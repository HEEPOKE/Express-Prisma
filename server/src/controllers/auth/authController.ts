import { Request, Response } from "express";
import config from "src/config/config";
import loginServices from "src/services/auth/authServices";

async function login(req: Request, res: Response) {
  try {
    await loginServices.login(req.body.email, req.body.password, res);
    res.redirect(`${config.ENDPOINT}`);
  } catch (err: any) {
    let response = {
      message: "Login Fail",
    };
    return res.status(500).json(response);
  }
}

const authController = { login };

export default authController;
