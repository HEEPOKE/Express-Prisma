import { Request, Response } from "express";
import userServices from "../services/userServices";

async function listUser(res: Response) {
  try {
    const user = await userServices.listUser();
    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user" });
  }
}

const controllers = { listUser };

export default controllers;
