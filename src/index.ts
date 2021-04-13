import express, { Application } from "express";
import { json } from "body-parser";

const PORT = 3000;

const app: Application = express();
app.use(json());

app.listen(PORT, () => {
  console.log(`Authentication Service running on port ${PORT}`);
});
