import * as dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  ENDPOINT,
  MY_SECRET_KEY,
  MY_REFRESH_KEY,
  EMAIL,
  PASSWORD
} = process.env;

const config = {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  ENDPOINT,
  MY_SECRET_KEY,
  MY_REFRESH_KEY,
  EMAIL,
  PASSWORD
};

export default config;
