import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
    currentUserRouter,
    signinRouter,
    signoutRouter,
    singupRouter,
} from "./routes/index";
import { errorHandler } from "./middlewares/index";
import { NotFoundError } from "./errors/index";

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
app.use(currentUserRouter);
app.use(signinRouter);
app.use(singupRouter);
app.use(signoutRouter);

app.all("*", async () => {
    throw new NotFoundError();
});

// error handler
app.use(errorHandler);

export { app }