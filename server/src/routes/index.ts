import express from "express";
import controllers from "../controllers/userController";

const router = express.Router();

router.get("/users/list", controllers.listUser);

export default router;
