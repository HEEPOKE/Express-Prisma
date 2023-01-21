import express from "express";
import { PrismaClient } from "@prisma/client";
import config from "./config/config";
import router from "./routes";

const prisma = new PrismaClient();

const app = express();

app.use("/api", router);

app.listen(config.PORT, () => {
  console.log("http://localhost:" + config.PORT);
});
