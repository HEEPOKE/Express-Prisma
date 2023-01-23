import db from "../config/db";

async function listUser() {
  return await db.user.findMany();
}

const userServices = { listUser };

export default userServices;
