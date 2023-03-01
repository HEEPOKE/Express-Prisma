import server from "./server";
import config from "./config/config";

const app = server();

const port = config.PORT || 6476;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
