import express, { Request, Response, NextFunction } from "express"
import "express-async-errors"
import dotenv from "dotenv"
import cors from "cors";
import router from "./router";
import path = require("path");
dotenv.config();
const { PORT } = process.env

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(403);
    res.json({ error: err.message });
  }
  res.status(500).json("Internal error.");
});


app.listen(PORT, () => { console.log(`Servidor rodando na porta ${PORT}`) })