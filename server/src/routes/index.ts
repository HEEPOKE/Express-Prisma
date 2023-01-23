import express from "express";
import type { Request, Response } from "express";
import controllers from "../controllers/userController";

const router = express.Router();

router.get("/users/list", (res: Response) => {
  controllers.listUser(res);
});

export default router;
