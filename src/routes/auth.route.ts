import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.post("/signup", (req: Request, res: Response) => {
  res.send("Hi there");
});

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
