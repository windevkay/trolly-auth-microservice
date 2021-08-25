import express, { Router, Request, Response } from "express";
import {
  sanitizeSignupParams,
  sanitizeSigninParams,
  validateRequest,
  currentUser,
} from "@stagefirelabs/common";

import AuthController from "../controllers/auth.controller";
import { IUser } from "../models/user.model";

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
  // destroy the JWT in the cookie
  req.session = null;
  res.send({});
});

router.get("/currentuser", currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as authenticationRouter };
