import { Request } from "express";
import jwt from "jsonwebtoken";

import { IUser } from "../models/user.model";

export const setUserToken = (req: Request, user: IUser) => {
  const userJWT = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );
  // store JWT in cookie-session
  req.session!.jwt = userJWT;
};
