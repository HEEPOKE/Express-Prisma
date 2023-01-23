import db from "../config/db";
import { UserModel } from "../models/user";

async function listUser() {
  return await db.user.findMany();
}

const userServices = { listUser };

export default userServices;
