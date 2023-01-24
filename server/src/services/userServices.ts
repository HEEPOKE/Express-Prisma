import db from "../config/db";

async function listUser() {
  return await db.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
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

async function updateUser(id: number, payload: any) {
  return await db.user.update({
    where: { id },
    data: payload,
  });
}

async function deleteUser(id: number) {
  return await db.user.delete({
    where: { id },
  });
}

async function findEmail(email: string) {
  return await db.user.findFirst({
    where: {
      email: email,
    },
  });
}

const userServices = {
  listUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  findEmail,
};

export default userServices;
