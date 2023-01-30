import supertest from "supertest";
import server from "../server";
import config from "../config/config";
import db from "../config/db";
import LoginRequest from "src/models/Request/LoginRequest";
import authController from "../controllers/auth/authController";

let request: supertest.SuperTest<supertest.Test>;

const app = server();

describe("Login", () => {
  beforeEach(async () => {
    return await db.user.create({
      data: {
        email: "test@example.com",
        password: "testpassword",
      },
    });
  });

  afterEach(async () => {
    await db.user.deleteMany();
  });

  it("should return a 200 and a JWT token on successful login", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("should return a 401 on incorrect email or password", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Password Not Correct" });
  });
});
