import { Role } from "../enums/role";

export interface UserModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
}
