import * as bcrypt from "bcrypt";

export const comparePassword =
  (dbPassword: string, interfacePassword: string) => () => {
    bcrypt.compare(dbPassword, interfacePassword);
  };
