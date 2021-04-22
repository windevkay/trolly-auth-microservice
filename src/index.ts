import express, { Application } from "express";
import "express-async-errors";
import { json } from "body-parser";

import { authenticationRouter } from "./routes/auth.route";

import { errorHandler } from "./middleware";
import { NotFoundError } from "./errors";

const PORT = 3000;

const app: Application = express();
app.use(json());

app.use("/api/users", authenticationRouter);

// handle unknown routes
app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Authentication Service running on port ${PORT}`);
});
