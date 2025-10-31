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

  const botao_comprar = document.createElement("button");
  botao_comprar.innerText = "Comprar";

  botao_comprar.addEventListener("click", async () => {
    const id_user = localStorage.getItem("id_user");
    if (id_user) {
      const resposta = await fetch("http://localhost:3000/comprar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total: produto.preco,
          id_produto: produto.id,
          id_user: id_user,
        }),
      });
      if (resposta.status == 201) {
        alert("Parabens pela compra!");
      }
    } else {
      window.location.href = "../Login/login.html";
    }
  });

  div_conteudo.append(titulo);
  div_conteudo.append(descricao);
  div_conteudo.append(preco);
  div_conteudo.append(botao_comprar);
});
