import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

import { ErrorStructure, CustomError, RequestValidationError } from "../errors";

export const sanitizeSignupParams = () => {
  return [
    body("email").isEmail().withMessage("Email needs to be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ];
};

export const sanitizeSigninParams = () => {
  return [
    body("email").isEmail().withMessage("Email needs to be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You need to provide a password"),
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

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  next();
};
