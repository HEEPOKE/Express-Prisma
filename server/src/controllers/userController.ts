import type { Request, Response } from "express";
import userServices from "../services/userServices";

async function listUser(res: Response) {
  try {
    const user = await userServices.listUser();
    return res.json(user);
  } catch (error: any) {
    return res.json({ message: "Failed to get user" });
  }
}

const controllers = { listUser };

export default controllers;
