export default interface JwtPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  iat: number;
  exp: number;
}
