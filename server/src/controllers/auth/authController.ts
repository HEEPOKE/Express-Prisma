import { Request, Response } from "express";
import config from "../../config/config";
import { hashPassword } from "../../common/hashPassword";
import authServices from "../../services/auth/authServices";

async function login(req: Request, res: Response) {
  try {
    await authServices.login(req.body.email, req.body.password, res);
    return;
  } catch (err: any) {
    let response = {
      message: "Login Fail",
    };
    return res.status(500).json(response);
  }
}

async function register(req: Request, res: Response) {
  try {
    const password = await hashPassword(req.body.password);

    let payload = {
      email: req.body.email,
      password: password,
    };

    await authServices.register(payload);

    return await authServices.login(req.body.email, req.body.password, res);
  } catch (err: any) {
    let response = {
      message: "Register Fail",
    };
    return res.status(500).json(response);
  }
}

const authController = { login, register };

export default authController;
