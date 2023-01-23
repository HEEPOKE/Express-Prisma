import express from "express";
import { Request, Response } from "express";
import authController from "../controllers/auth/authController";
import userController from "../controllers/userController";

const router = express.Router();

router.post("/auth/login", (req: Request, res: Response) => {
  authController.login(req, res);
});
router.post("/auth/register", (req: Request, res: Response) => {
  authController.register(req, res);
});

router.get("/users/list", (_, res: Response) => {
  userController.listUser(res);
});
router.get("/users/get/:id", (req: Request, res: Response) => {
  userController.getUserById(req, res);
});
router.post("/user/create", (req: Request, res: Response) => {
  userController.createUser(req, res);
});
router.put("/user/update/:id", (req: Request, res: Response) => {
  userController.updateUser(req, res);
});
router.delete("/user/delete/:id", (req: Request, res: Response) => {
  userController.deleteUser(req, res);
});

export default router;
