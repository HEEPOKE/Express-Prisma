import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import userServices from "../services/userServices";

async function listUser(res: Response) {
  try {
    const user = await userServices.listUser();

    let response = {
      message: "Success",
      payload: user,
    };

    return res.status(200).json(response);
  } catch (err: any) {
    let response = {
      message: "Failed to get user",
    };

    return res.status(500).json(response);
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

    return res.status(200).json(response);
  } catch (err: any) {
    let response = {
      message: "Failed to get user",
    };

    return res.status(500).json(response);
  }
}

async function createUser(req: Request, res: Response) {
  try {
    const findEmail = await userServices.findEmail(req.body.email);

    if (!findEmail) {
      let saltRounds = 10;
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

      let payload = {
        email: req.body.email,
        password: hashPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };

      const user = await userServices.createUser(payload);

      let response = {
        message: "Success",
        payload: user,
      };

      return res.status(201).json(response);
    } else {
      let message = {
        message: "อีเมล์นี้มีผู้ใช้สมัครแล้ว",
      };
      return res.status(500).json(message);
    }
  } catch (err: any) {
    let response = {
      message: err,
    };
    return res.status(500).json(response);
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id) ?? false;

    if (!id) {
      let ErrMessage = {
        message: "id required",
      };
      return res.json(ErrMessage);
    }

    const user = await userServices.updateUser(id, req.body);

    let response = {
      message: "Success",
      payload: user,
    };

    return res.status(200).json(response);
  } catch (err: any) {
    let response = {
      message: "Failed",
    };
    return res.status(500).json(response);
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id) ?? false;

    if (!id) {
      let ErrMessage = {
        message: "id required",
      };
      return res.json(ErrMessage);
    }

    await userServices.deleteUser(id);

    let response = {
      message: "Success",
    };

    return res.status(200).json(response);
  } catch (err: any) {
    let response = {
      message: "Failed",
    };
    return res.status(500).json(response);
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
