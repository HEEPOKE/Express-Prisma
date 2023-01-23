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

async function createUser(payload: any) {
  return await db.user.create({
    data: payload,
  });
}

const userServices = { listUser, getUserById, createUser };

export default userServices;
