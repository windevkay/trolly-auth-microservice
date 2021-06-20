import express, { Application } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { authenticationRouter } from "./routes/auth.route";

import { errorHandler } from "./middleware";
import { NotFoundError } from "./errors";

const app: Application = express();
// allows proxys through ingress-NGINX
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use("/api/users", authenticationRouter);

// handle unknown routes
app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
