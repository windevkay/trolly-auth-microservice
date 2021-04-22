import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

import { ErrorStructure, CustomError } from "../errors";

export const sanitizeSignupParams = () => {
  return [
    body("email").isEmail().withMessage("Email needs to be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ];
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const serializedErrors: ErrorStructure[] = err.serializeErrors();
    res.status(err.statusCode).send({ errors: serializedErrors });
  }

  //generic response for unknown error types
  res.status(400).send("something went wrong...");
};
