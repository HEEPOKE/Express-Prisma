import { Role } from "../enum/role";

export class UserResponse {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
};
