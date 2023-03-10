import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

declare global {
    function signin(): Promise<string[]>
    // namespace NodeJS {
    //     interface Global {
    //     }
    // }
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = "thisisjestsecretjwt";
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = async () => {
    const email = "testcase@gmail.com";
    const password = "password";

    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email,
            password,
        })
        .expect(201);

    const cookie = response.get('Set-Cookie')
    return cookie
};
