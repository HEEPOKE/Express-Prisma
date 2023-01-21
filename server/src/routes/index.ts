import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/a", (req: Request, res: Response) => {
    res.send("Application works!");
  });

export default router;
