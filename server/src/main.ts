import express from "express";
import cors from "cors";
import config from "./config/config";
import router from "./routes";

const app = express();

app.use(cors());

app.use("/api", router);

app.listen(config.PORT, () => {
  console.log(`http://localhost:${config.PORT}`);
});
