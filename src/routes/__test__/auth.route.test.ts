import request from "supertest";
import faker from "faker";

import { app } from "../../app";

describe("SIGNUP", () => {
  it("should return 201 on signup success", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
      .expect(201);
  });

  it("should return 400 on invalid email", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "",
        password: faker.internet.password(),
      })
      .expect(400);
  });

  it("should return 400 on invalid password", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: faker.internet.email(),
        password: "",
      })
      .expect(400);
  });

  it("should return 400 on invalid password and email", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "",
        password: "",
      })
      .expect(400);
  });
});
