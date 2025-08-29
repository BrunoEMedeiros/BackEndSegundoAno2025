import express from "express";

const app = express();

let listaPessoas = [
  { id: 1, nome: "Bruno", idade: 26 },
  { id: 2, nome: "Bruno", idade: 16 },
  { id: 3, nome: "Arthur", idade: 16 },
  { id: 4, nome: "Arthur", idade: 16 },
];

app.get("/perfil/:id", (requisicao, resposta) => {
  const { id } = requisicao.params;

  const pessoa = listaPessoas.find((pessoa) => pessoa.id == id);

  return resposta.send(`Ola ${pessoa.nome} que tem ${pessoa.idade} anos`);
});

app.listen(3000, () => {
  console.log("No ar!");
});
