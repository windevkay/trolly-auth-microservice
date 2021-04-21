import express, { Application } from "express";
import { json } from "body-parser";

import { authenticationRouter } from "./routes/auth.route";

import { errorHandler } from "./middleware";

const PORT = 3000;

const app: Application = express();
app.use(json());

app.use("/api/users", authenticationRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Authentication Service running on port ${PORT}`);
});
