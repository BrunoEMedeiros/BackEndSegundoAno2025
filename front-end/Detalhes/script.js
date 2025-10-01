// Pegando os dados que vem na URL da pagina
const urlParams = new URLSearchParams(window.location.search);

window.addEventListener("load", async () => {
  const id = urlParams.get("id");
  const resposta = await fetch(`http://localhost:3000/produtos/${id}`);
  const produto = await resposta.json();

  const div_esquerda = document.querySelector("#esquerda");
  const div_conteudo = document.querySelector("#conteudo");

  const imagem = document.createElement("img");
  imagem.src = produto.imagem;

  div_esquerda.appendChild(imagem);

  const titulo = document.createElement("h1");
  titulo.innerText = produto.titulo;

  const descricao = document.createElement("p");
  descricao.innerText = produto.descricao;

  const preco = document.createElement("h3");
  preco.innerText = produto.preco;

  div_conteudo.appendChild(titulo);
  div_conteudo.appendChild(descricao);

  div_conteudo.appendChild(preco);
});
