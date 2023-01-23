import db from "../config/db";

async function listUser() {
  return await db.user.findMany();
}

async function getUserById(id: number) {
  return await db.user.findFirst({
    where: {
      id: id,
    },
  });
}

const userServices = { listUser, getUserById };

export default userServices;
