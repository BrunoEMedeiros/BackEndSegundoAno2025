import express from "express";
import cors from "cors";
import { listaProdutos } from "./produtos.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/produtos", (requisicao, resposta) => {
  return resposta.status(200).json(listaProdutos);
});

app.listen(3000, () => {
  console.log("No ar!");
});
