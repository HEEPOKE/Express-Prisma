import type { Request, Response } from "express";
import userServices from "../services/userServices";

async function listUser(res: Response) {
  try {
    const user = await userServices.listUser();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get user" });
  }
}

const controllers = { listUser };

export default controllers;
