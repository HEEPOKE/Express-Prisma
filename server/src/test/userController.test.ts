import supertest from "supertest";
import server from "../server";
import config from "../config/config";

const app = server();

let token: string;

describe("Login", () => {
  it("should return a 200 and successful login", async () => {
    const response = await supertest(app)
      .post("/api/auth/register")
      .send({
        email: `${config.EMAIL}`,
        password: `${config.PASSWORD}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Success");

    token = response.body.Authorization;
  });
});

// describe("List Users", () => {
//   it("should return a list of users", async () => {
//     const response = await supertest(app)
//       .get("/api/users/list")
//       .set("Authorization", `${token}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("message", "Success");
//   });
// });

describe("create User", () => {
  it("should return a 201 and create a user", async () => {
    const response = await supertest(app)
      .post("/api/user/create")
      .set("Authorization", `${token}`)
      .send({
        email: "johndoe@example.com",
        password: "yoyo5555",
        firstName: "c",
        lastName: "d",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Success");
  });
});

// describe("List User By Id", () => {
//   it("should return a 200 and get a user", async () => {
//     const createResponse = await supertest(app)
//       .post("/api/user/create")
//       .set("Authorization", `${token}`)
//       .send({
//         email: "nddnd@example.com",
//         password: "yoyo5555",
//         firstName: "aa",
//         lastName: "daa",
//       });

//     const id = createResponse.body.data?.payload?.id;

//     const response = await supertest(app)
//       .get(`/api/user/get/${id}`)
//       .set("Authorization", `${token}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("message", "Success");
//   });
// });

// describe("update User", () => {
//   it("should return a 200 and update a user", async () => {
//     const createResponse = await supertest(app)
//       .post("/api/user/create")
//       .set("Authorization", `${token}`)
//       .send({
//         email: "cccac@example.com",
//         password: "yoyo5555",
//         firstName: "aa",
//         lastName: "daa",
//       });

//     const id = createResponse.body.data.payload["id"];

//     const response = await supertest(app)
//       .put(`/api/user/update/${id}`)
//       .set("Authorization", `${token}`)
//       .send({
//         firstName: "Jane",
//       });

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("message", "Success");
//   });
// });

// describe("delete User", () => {
//   it("should return a 200 and delete a user", async () => {
//     const createResponse = await supertest(app)
//       .post("/api/user/create")
//       .set("Authorization", `${token}`)
//       .send({
//         email: "mnbvcx@example.com",
//         password: "yoyo5555",
//         firstName: "aa",
//         lastName: "daa",
//       });

//     const id = createResponse.body.payload["id"];

//     const response = await supertest(app)
//       .delete(`/api/user/delete/${id}`)
//       .set("Authorization", `${token}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("message", "Success");
//   });
// });
