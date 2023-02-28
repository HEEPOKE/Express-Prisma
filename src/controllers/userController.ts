import { Request, Response } from "express";
import { hashPassword } from "../common/hashPassword";
import userServices from "../services/userServices";

async function listUser(req: Request, res: Response) {
  try {
    const user = await userServices.listUser();

    return res.status(200).json({
      message: "Success",
      payload: user,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Failed to get user" });
  }
}

async function getUserById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "id required" });
    }

    const user = await userServices.getUserById(id);

    return res.status(200).json({ message: "Success", payload: user });
  } catch (err) {
    return res.status(500).json({ message: "Failed to get user" });
  }
}

async function createUser(req: Request, res: Response) {
  try {
    const findEmail = await userServices.findEmail(req.body.email);

    if (!findEmail) {
      const password = await hashPassword(req.body.password);

      let payload = {
        email: req.body.email,
        password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };

      const user = await userServices.createUser(payload);

      return res.status(201).json({ message: "Success", payload: user });
    } else {
      return res.status(500).json({ message: "อีเมล์นี้มีผู้ใช้สมัครแล้ว" });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "id required" });
    }

    const user = await userServices.updateUser(id, req.body);

    return res.status(200).json({ message: "Success", payload: user });
  } catch (err) {
    return res.status(500).json({ message: "Update User Failed" });
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Id required" });
    }

    await userServices.deleteUser(id);

    return res.status(200).json({ message: "Success" });
  } catch (err) {
    return res.status(500).json({ message: "Delete Failed" });
  }
}

const userController = {
  listUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userController;
