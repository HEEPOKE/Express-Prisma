import { Role } from "../enum/role";

export interface UserModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
}

// class User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;

//   constructor(id: number, name: string, email: string, password: string) {
//     this.id = id;
//     this.name = name;
//     this.email = email;
//     this.password = password;
//   }