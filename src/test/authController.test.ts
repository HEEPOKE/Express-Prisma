import supertest from "supertest";
import server from "../server";
import db from "../config/db";

const app = server();

describe("auth", () => {
  beforeEach(async () => {
    return await db.user.create({
      data: {
        email: "test@email.com",
        password: "password",
      },
    });
  });

  afterEach(async () => {
    await db.user.deleteMany();
  });

  describe("Register", () => {
    it("should return a success message on register", async () => {
      const response = await supertest(app).post("api/auth/register").send({
        firstName: "Test",
        lastName: "User",
        email: "Damon1FX@gmail.com",
        password: "yoyo5555",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Success",
      });
    });
  });

  describe("Login", () => {
    it("should return a success message on login", async () => {
      const response = await supertest(app)
        .post("/api/auth/login")
        .send({ email: "Damon1FX@gmail.com", password: "yoyo5555" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Success",
      });
    });
  });
});
