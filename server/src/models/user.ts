import { Role } from "../enum/role";

export type UserModel = {
  id?: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
};
