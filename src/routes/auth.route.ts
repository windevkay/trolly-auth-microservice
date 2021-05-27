import express, { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import AuthController from "../controllers/auth.controller";

import { IUser } from "../models/user.model";

import { RequestValidationError } from "../errors";
import { sanitizeSignupParams } from "../middleware";

const authController = new AuthController();

const router: Router = express.Router();

router.post(
  "/signup",
  sanitizeSignupParams(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const user: IUser = await authController.createUser({ req, res });
    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "asdf"
    );
    // store JWT in cookie-session
    req.session!.jwt = userJWT;
    res.status(201).send(user);
  }
);

router.post("/signin", (req: Request, res: Response) => {
  res.send("Hi there");
});

router.post("/signout", (req: Request, res: Response) => {
  res.send("Hi there");
});

router.get("/currentuser", (req: Request, res: Response) => {
  res.send("Hi there");
});

export { router as authenticationRouter };
