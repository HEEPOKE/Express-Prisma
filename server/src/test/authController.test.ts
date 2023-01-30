import supertest from "supertest";
import server from "../server";
import config from "../config/config";
import authController from "../controllers/auth/authController";

const app = server();

const user = {
  email: `${config.EMAIL}`,
  password: `${config.PASSWORD}`,
};

describe("given the user is logged in", () => {
  it("should return a 200", async () => {
    // const jwt = signJwt(userPayload);

    const { statusCode, body } = await supertest(app)
      .post("/api/auth/login")
      //   .set("Authorization", `Bearer ${jwt}`)
      .send(user);

    expect(statusCode).toBe(200);

    expect(body).toEqual({
      message: expect.any(String),
      payload: expect.any({}),
      Authorization: expect.any(String),
      Refresh_token: expect.any(String),
      token_exp: expect.any(Number),
    });
  });
});
