import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { authenticationRouter } from "./routes/auth.route";

import { errorHandler } from "./middleware";
import { NotFoundError } from "./errors";

const PORT = 3000;

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

// connect to the mongo instance in k8s cluster and fire up server!
const runServer = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_CLUSTER_ADDRESS}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }

  app.listen(PORT, () => {
    console.log(`Authentication Service running on port ${PORT}`);
  });
};

runServer();
