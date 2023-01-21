import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import PORT from "./config/config";

const prisma = new PrismaClient();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});


app.listen(PORT, () => {
  console.log(PORT);
});
