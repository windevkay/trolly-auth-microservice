import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.post("/api/users/signup", (req: Request, res: Response) => {
  res.send("Hi there");
});

router.post("/api/users/signin", (req: Request, res: Response) => {
  res.send("Hi there");
});

router.post("/api/users/signout", (req: Request, res: Response) => {
  res.send("Hi there");
});

router.get("/api/users/currentuser", (req: Request, res: Response) => {
  res.send("Hi there");
});

export { router as authenticationRouter };
