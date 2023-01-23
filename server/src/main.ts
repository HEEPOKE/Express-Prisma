import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as bodyParser from "body-parser";
import config from "./config/config";
import router from "./routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use("/api", router);

app.listen(config.PORT, () => {
  console.log(`http://localhost:${config.PORT}`);
});
