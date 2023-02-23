import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from 'jsonwebtoken'

declare global {
    function signin(): string[]
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

global.signin = () => {
    // Build a JWT payload. {id, email}
    const payload = {
        id: '2131212414',
        email: "test@gmail.com"
    }

    // Create a JWT!
    const tokem = jwt.sign(payload, process.env.JWT_KEY!)

    // Build session object. {jwt: MY_JWT}
    const session = { jwt: tokem }

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session)

    // Take JSON and encode into Base64
    const base64 = Buffer.from(sessionJSON).toString('base64')

    // Return a string thats the cookie with encoded data
    return [`session=${base64}`]

};