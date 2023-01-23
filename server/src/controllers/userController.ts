import type { Request, Response } from "express";
import userServices from "../services/userServices";

async function listUser(res: Response) {
  try {
    const user = await userServices.listUser();

    let response = {
      message: "Success",
      payload: user,
    };

    return res.json(response);
  } catch (error: any) {
    let response = {
      message: "Failed to get user",
    };

    return res.json(response);
  }
}

async function getUserById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id) ?? false;

    if (!id) {
      let ErrMessage = {
        message: "id required",
      };
      return res.json(ErrMessage);
    }

    const user = await userServices.getUserById(id);

    let response = {
      message: "Success",
      payload: user,
    };

    return res.json(response);
  } catch (error: any) {
    let response = {
      message: "Failed to get user",
    };

    return res.json(response);
  }
}

const controllers = { listUser, getUserById };

export default controllers;
