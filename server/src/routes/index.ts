import express from "express";
import { Request, Response } from "express";
import authenticateToken from "../middleware/validationMiddleware";
import authController from "../controllers/auth/authController";
import userController from "../controllers/userController";

const router = express.Router();

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);

router.get("/users/list", authenticateToken, userController.listUser);
router.get("/users/get/:id", authenticateToken, userController.getUserById);
router.post("/user/create", authenticateToken, userController.createUser);
router.put("/user/update/:id", authenticateToken, userController.updateUser);
router.delete("/user/delete/:id", authenticateToken, userController.deleteUser);

export default router;
