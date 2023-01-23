import express from "express";
import { Request, Response } from "express";
import controllers from "../controllers/userController";

const router = express.Router();

router.get("/users/list", (_, res: Response) => {
  controllers.listUser(res);
});
router.get("/users/get/:id", (req: Request, res: Response) => {
  controllers.getUserById(req, res);
});
router.post("/user/create", (req: Request, res: Response) => {
  controllers.createUser(req, res);
});
router.put("/user/update/:id", (req: Request, res: Response) => {
  controllers.updateUser(req, res);
});
router.delete("/user/delete/:id", (req: Request, res: Response) => {
  controllers.deleteUser(req, res);
});

export default router;
