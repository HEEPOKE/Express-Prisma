import supertest from "supertest";
import server from "../server";
import config from "../config/config";
import db from "../config/db";

const app = server();

// describe("users", () => {
//   beforeEach(async () => {
//     return await db.user.create({
//       data: {
//         email: `${config.EMAIL}`,
//         password: `${config.PASSWORD}`,
//       },
//     });
//   });

//   afterEach(async () => {
//     await db.user.deleteMany();
//   });

//   it("should return a list of users", async () => {
//     const loginResponse = await supertest(app)
//       .post("/api/auth/login")
//       .send({
//         email: `${config.EMAIL}`,
//         password: `${config.PASSWORD}`,
//       });

//     const token = loginResponse.body.Authorization;
//     const response = await supertest(app)
//       .get("/api/users/list")
//       .set("Authorization", token);

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("message", "Success");
//   });
// });
