import express from "express";
import cors from "cors";
import sql from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rota para trazer todos os produtos
app.get("/produtos", async (requisicao, resposta) => {
  const produtos = await sql`SELECT * FROM produtos`;
  return resposta.status(200).json(produtos);
});

app.get("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const produto = await sql`SELECT * FROM produtos WHERE id = ${id}`;
  return res.status(200).json(produto[0]);
});

app.listen(3000, () => {
  console.log("No ar!");
});
