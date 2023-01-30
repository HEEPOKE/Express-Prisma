import { Request, Response } from "express";
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
    const hashedPassword = await hashPassword(req.body.password);

    let payload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
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

async function refreshToken(req: Request, res: Response) {
  const user = {
    id: req.body.id,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
  };

  return await authServices.refreshToken(user, res);
}

async function logout(req: Request, res: Response) {
  try {
    return await authServices.logout(req, res);
  } catch (err: any) {
    return res.status(500).json({ message: "Logout Fail" });
  }
}

const authController = { login, register, refreshToken, logout };

export default authController;
