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

// Rota para trazer os detalhes de um produto especifico
app.get("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const produto = await sql`SELECT * FROM produtos WHERE id = ${id}`;
  return res.status(200).json(produto[0]);
});

// Rota para fazer login
app.post("/usuarios/login", async (req, res) => {
  const { email, senha } = req.body;
  const usuario =
    await sql`select * from usuarios where email = ${email} and senha = ${senha}`;
  if (usuario[0]) {
    return res.status(200).json(usuario[0]);
  }
  return res.status(401).json("Usuario ou senha incorretos");
});

app.post("/usuarios", async (req, res) => {
  const { nome, email, senha } = req.body;
  await sql`insert into usuarios(nome, email, senha, nivel) values (${nome}, ${email}, ${senha}, 1)`;
  return res.status(201).json("cadastrado");
});

app.post("/comprar", async (req, res) => {
  const { total, id_produto, id_user } = req.body;

  const id_venda =
    await sql`insert into vendas(total, data_venda, id_user, id_produto) values(${total},${new Date()},${id_user},${id_produto}) returning id`;

  return res.status(201).json("Compra feita!");
});

app.get("/usuarios/compras/:id", async (req, res) => {
  const { id } = req.params;
  const compras =
    await sql`select v.id, v.total, v.data_venda, p.titulo, p.imagem from vendas as v
      join produtos as p
      on v.id_produto = p.id
      where v.id_user = ${id}`;
  return res.status(200).json(compras);
});

app.listen(3000, () => {
  console.log("No ar!");
});
