import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError } from "@kk-dev/common";

const app = express();

app.set("trust proxy", true);

app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);

// routes


app.all("*", async () => {
    throw new NotFoundError();
});

// error handler
app.use(errorHandler);

export { app }