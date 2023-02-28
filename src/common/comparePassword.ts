import * as bcrypt from "bcrypt";

async function comparePassword(dbPassword: string, interfacePassword: string) {
  const isMatch = await bcrypt.compare(interfacePassword, dbPassword);
  return isMatch;
}

export default comparePassword;
