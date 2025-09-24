import express from "express";
import cors from "cors";
import { listaProdutos } from "./produtos.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rota para trazer todos os produtos
app.get("/produtos", (requisicao, resposta) => {
  return resposta.status(200).json(listaProdutos);
});

app.get("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const produto = listaProdutos.find((p) => p.id == id);
  return res.status(200).json(produto);
});

app.listen(3000, () => {
  console.log("No ar!");
});
