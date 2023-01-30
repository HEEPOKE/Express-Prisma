import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as bodyParser from "body-parser";
import router from "../routes";

export default function server() {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  app.use("/api", router);

  return app;
}
