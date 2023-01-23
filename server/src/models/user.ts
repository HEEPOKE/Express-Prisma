import { Role } from "../enum/role";

export interface UserModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
}
