import express, { Request, Response, NextFunction } from "express";
import https from "https";
import fs from "fs";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router";

dotenv.config();
const { PORT } = process.env;

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

// Caminhos dos arquivos do Let's Encrypt (certificados)
const sslOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/simplificada.saude.paulista.pe.gov.br/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/simplificada.saude.paulista.pe.gov.br/fullchain.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/live/simplificada.saude.paulista.pe.gov.br/chain.pem")
};

// Inicia o servidor HTTPS usando os certificados SSL do Let's Encrypt
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Servidor HTTPS rodando na porta ${PORT}`);
});
