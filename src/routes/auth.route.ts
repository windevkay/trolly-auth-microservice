import express, { Router, Request, Response } from "express";

import AuthController from "../controllers/auth.controller";
import { IUser } from "../models/user.model";
import {
  sanitizeSignupParams,
  sanitizeSigninParams,
  validateRequest,
} from "../middleware";
import { setUserToken } from "../utils";

const authController = new AuthController();

const router: Router = express.Router();

router.post(
  "/signup",
  sanitizeSignupParams(),
  validateRequest,
  async (req: Request, res: Response) => {
    const user: IUser = await authController.createUser({ req });
    setUserToken(req, user);
    res.status(201).send(user);
  }
);

router.post(
  "/signin",
  sanitizeSigninParams(),
  validateRequest,
  async (req: Request, res: Response) => {
    const user: IUser = await authController.signInUser({ req });
    setUserToken(req, user);
    res.status(200).send(user);
  }
);

router.post("/signout", (req: Request, res: Response) => {
  res.send("Hi there");
});

router.get("/currentuser", (req: Request, res: Response) => {
  res.send("Hi there");
});

export { router as authenticationRouter };
