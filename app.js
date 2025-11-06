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

// Rota para mostrar todos os produtos cadastrados por um usuario
app.get("/usuarios/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const produtos = await sql`select * from produtos where id_user = ${id}`;
  return res.status(200).json(produtos);
});

// Rota para mostrar todas as compras de um usuario
app.get("/usuarios/compras/:id", async (req, res) => {
  const { id } = req.params;
  const compras =
    await sql`select v.id, v.total, v.data_venda, p.titulo, p.imagem from vendas as v
      join produtos as p
      on v.id_produto = p.id
      where v.id_user = ${id}`;
  return res.status(200).json(compras);
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

// Rota de cadastro de usuario
app.post("/usuarios", async (req, res) => {
  const { nome, email, senha } = req.body;
  await sql`insert into usuarios(nome, email, senha, nivel) values (${nome}, ${email}, ${senha}, 1)`;
  return res.status(201).json("cadastrado");
});

// Rota para salvar a compra do usuario
app.post("/comprar", async (req, res) => {
  const { total, id_produto, id_user } = req.body;

  await sql`insert into vendas(total, data_venda, id_user, id_produto) values(${total},${new Date()},${id_user},${id_produto}) returning id`;

  return res.status(201).json("Compra feita!");
});

app.post("/produtos", async (req, res) => {
  const { titulo, descricao, imagem, preco, id_user } = req.body;
  await sql`insert into produtos(titulo, descricao, imagem, preco, id_user) values(${titulo},${descricao},${imagem},${preco},${id_user})`;

  return res.status(201).json("produto criado");
});

app.delete("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await sql`delete from produtos where id = ${id} `;
    return res.status(200).json("produto deletado");
  } catch (error) {
    res
      .status(409)
      .json("Produto não pode ser deletado por que ja foi vendido");
  }
});

app.listen(3000, () => {
  console.log("No ar!");
});
