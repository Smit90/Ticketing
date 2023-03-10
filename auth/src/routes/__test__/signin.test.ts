import request from "supertest";
import { app } from "../../app";

it("fails when a email the does not exist is supplied", async () => {
    return request(app)
        .post("/api/users/signin")
        .send({
            email: "testcase@gmail.com",
            password: "testcase",
        })
        .expect(400);
});

it("fails when a incorrect password is supplied", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "testcase@gmail.com",
            password: "testcase",
        })
        .expect(201);

    await request(app)
        .post("/api/users/signin")
        .send({
            email: "testcase@gmail.com",
            password: "safasfaf",
        })
        .expect(400);
});

it("response with a cookie when given valid credentials", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "testcase@gmail.com",
            password: "testcase",
        })
        .expect(201);

    const response = await request(app)
        .post("/api/users/signin")
        .send({
            email: "testcase@gmail.com",
            password: "testcase",
        })
        .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
});
