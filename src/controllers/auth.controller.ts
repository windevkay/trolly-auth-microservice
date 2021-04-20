import { Request, Response } from "express";
// All logic for auth routes
export default class AuthController {
  /**
   * Create an application user
   * @param params express request object
   */
  public createUser = async (params: { req: Request }) => {
    const { req } = params;
  };
}
