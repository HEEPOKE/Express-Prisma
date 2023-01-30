import server from "./server";
import config from "./config/config";

const app = server();

app.listen(config.PORT, () => {
  console.log(`http://localhost:${config.PORT}`);
});
