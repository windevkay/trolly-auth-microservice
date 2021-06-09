import { Request } from "express";

import { User, IUser } from "../models/user.model";
import { PasswordService } from "../services";
import { BadRequestError } from "../errors";

export default class AuthController {
  /**
   * Create an application user
   * @param params express request object
   */
  public createUser = async (params: { req: Request }): Promise<IUser> => {
    const { req } = params;
    const { email, password } = req.body;
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new BadRequestError("Email already in use");
      }
      // create and save user
      const user: IUser = User.build({ email, password });
      const savedUser = await user.save();
      return Promise.resolve(savedUser);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  /**
   * Checks supplied credentials in order to signin a user
   * @param params express request object
   */
  public signInUser = async (params: { req: Request }): Promise<IUser> => {
    const { req } = params;
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        throw new BadRequestError("Invalid credentials");
      }
      const passwordVerified = await PasswordService.compare(
        existingUser.password,
        password
      );
      if (!passwordVerified) {
        throw new BadRequestError("Invalid credentials");
      }
      return Promise.resolve(existingUser);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
