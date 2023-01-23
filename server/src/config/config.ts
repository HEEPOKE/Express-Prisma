import * as dotenv from "dotenv";

dotenv.config();

const { PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, ENDPOINT } =
  process.env;

const config = {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  ENDPOINT,
};

export default config;
