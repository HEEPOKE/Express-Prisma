import supertest from "supertest";
import server from "../server";
import db from "../config/db";

const app = server();

describe("auth", () => {
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

  it("should return a 200 successful registration", async () => {
    const response = await supertest(app).post("/api/auth/register").send({
      email: "test1@example.com",
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Success");
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
