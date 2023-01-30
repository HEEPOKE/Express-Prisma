import supertest from "supertest";
import server from "../server";
import config from "../config/config";
import db from "../config/db";

const app = server();

beforeEach(async () => {
  return await db.user.create({
    data: {
      email: `${config.EMAIL}`,
      password: `${config.PASSWORD}`,
    },
  });
});

afterEach(async () => {
  await db.user.deleteMany();
});

describe("users", () => {
  it("should return a list of users", async () => {
    const loginResponse = await supertest(app)
      .post("/api/auth/login")
      .send({
        email: `${config.EMAIL}`,
        password: `${config.PASSWORD}`,
      });

    const token = loginResponse.body.Authorization;

    const response = await supertest(app)
      .get("/api/users/list")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Success");
  });

  it("should return a 201 and create a user", async () => {
    const loginResponse = await supertest(app)
      .post("/api/auth/login")
      .send({
        email: `${config.EMAIL}`,
        password: `${config.PASSWORD}`,
      });
    const token = loginResponse.body.Authorization;

    const response = await supertest(app)
      .post("/api/user/create")
      .set("Authorization", token)
      .send({
        email: "johndoe@example.com",
        password: "yoyo5555",
        firstName: "c",
        lastName: "d",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Success");
  });

  it("should return a 200 and get a user", async () => {
    const loginResponse = await supertest(app)
      .post("/api/auth/login")
      .send({
        email: `${config.EMAIL}`,
        password: `${config.PASSWORD}`,
      });
    const token = loginResponse.body.Authorization;

    const createResponse = await supertest(app)
      .post("/api/user/create")
      .set("Authorization", token)
      .send({
        email: "nddnd@example.com",
        password: "yoyo5555",
        firstName: "aa",
        lastName: "daa",
      });

    const id = createResponse.body.payload["id"];

    const response = await supertest(app)
      .get(`/api/user/get/114${id}`)
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Success");
  });

  it("should return a 200 and update a user", async () => {
    const loginResponse = await supertest(app)
      .post("/api/auth/login")
      .send({
        email: `${config.EMAIL}`,
        password: `${config.PASSWORD}`,
      });
    const token = loginResponse.body.Authorization;

    const createResponse = await supertest(app)
      .post("/api/user/create")
      .set("Authorization", token)
      .send({
        email: "cccac@example.com",
        password: "yoyo5555",
        firstName: "aa",
        lastName: "daa",
      });

    const id = createResponse.body.payload["id"];

    const response = await supertest(app)
      .put(`/api/user/update/114${id}`)
      .set("Authorization", token)
      .send({
        firstName: "Jane",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Success");
  });

  it("should return a 200 and delete a user", async () => {
    const loginResponse = await supertest(app)
      .post("/api/auth/login")
      .send({
        email: `${config.EMAIL}`,
        password: `${config.PASSWORD}`,
      });
    const token = loginResponse.body.Authorization;

    const response = await supertest(app)
      .delete("/api/user/delete/114")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Success");
  });
});
