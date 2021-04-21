import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

import {
  RequestValidationError,
  DatabaseConnectionError,
  UnifiedErrorStructure,
} from "../errors";

export const sanitizeSignupParams = () => {
  return [
    body("email").isEmail().withMessage("Email needs to be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ];
};

const returnUnifiedError = (
  errors: { message: any; field?: string }[],
  res: Response,
  code: number
) => {
  const error: UnifiedErrorStructure = { errors };
  res.status(code).send(error);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
    returnUnifiedError(formattedErrors, res, 400);
  }

  if (err instanceof DatabaseConnectionError) {
    const formattedErrors = [{ message: err.failureReason }];
    returnUnifiedError(formattedErrors, res, 500);
  }

  //generic response for unknown error types
  returnUnifiedError([{ message: "something went wrong.." }], res, 400);
};
