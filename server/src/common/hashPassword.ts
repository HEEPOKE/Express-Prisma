import * as bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  let saltRounds = 10;
  
  return bcrypt.hash(password, saltRounds);
};
