import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let listaPessoas = [
  { id: 1, nome: "Bruno", idade: 26 },
  { id: 2, nome: "Bruno", idade: 16 },
  { id: 3, nome: "Arthur", idade: 16 },
  { id: 4, nome: "Arthur", idade: 16 },
];

app.get("/perfil/:id", (requisicao, resposta) => {
  const { id } = requisicao.params;

  const pessoa = listaPessoas.find((pessoa) => pessoa.id == id);

  return resposta.status(200).json(pessoa);
});

app.listen(3000, () => {
  console.log("No ar!");
});
