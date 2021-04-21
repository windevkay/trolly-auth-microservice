import express, { Router, Request, Response } from "express";
import { validationResult } from "express-validator";

import AuthController from "../controllers/auth.controller";

import { RequestValidationError, DatabaseConnectionError } from "../errors";
import { sanitizeSignupParams } from "../middleware";

const authController = new AuthController();

const router: Router = express.Router();

router.post(
  "/signup",
  sanitizeSignupParams(),
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    res.send("creating user....");
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
