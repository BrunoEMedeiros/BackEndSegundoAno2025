const botao_novo_produto = document.querySelector("#botao_novo_produto");
const h1_nome_usuario = document.querySelector("#nome_usuario");
const id_user = localStorage.getItem("id_user");
const nome = localStorage.getItem("nome");
const botao_sair = document.querySelector("#sair");
h1_nome_usuario.innerHTML = nome;

async function ListarMeusProdutos() {
  const div_content = document.querySelector("#produtos");

  const resposta = await fetch(
    `http://localhost:3000/usuarios/produtos/${id_user}`
  );
  const produtos = await resposta.json();

  produtos.map((p) => {
    const div_card = document.createElement("div");
    div_card.id = "card";

    const imagem_card = document.createElement("img");
    imagem_card.src = p.imagem;

    const titulo_card = document.createElement("h5");
    titulo_card.innerText = p.titulo;

    const descricao_card = document.createElement("p");
    descricao_card.innerText = p.descricao;

    const preco_card = document.createElement("h6");
    preco_card.innerText = "R$ " + p.preco;

    const div_botoes = document.createElement("div");
    div_botoes.id = "div_acoes";

    const botao_editar = document.createElement("button");
    botao_editar.id = "editar";
    botao_editar.className = "botao_acao";
    botao_editar.innerText = "✏️";
    const botao_excluir = document.createElement("button");
    botao_excluir.id = "excluir";
    botao_excluir.className = "botao_acao";
    botao_excluir.innerText = "❌";
    botao_excluir.addEventListener("click", async () => {
      await ExcluirProduto(p.id);
    });

    div_botoes.append(botao_editar, botao_excluir);

    div_card.append(
      imagem_card,
      titulo_card,
      descricao_card,
      preco_card,
      div_botoes
    );

    div_content.appendChild(div_card);
  });
}

async function ExcluirProduto(id) {
  const resposta = await fetch(`http://localhost:3000/produtos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (resposta.status == 200) {
    return alert("Produto deletado!");
  } else {
    const mensagem = await resposta.json();
    return alert(mensagem);
  }
}

function LimparCampos() {
  document.querySelector("#nome").value = "";
  document.querySelector("#descricao").value = "";
  document.querySelector("#preco").value = "";
  document.querySelector("#imagem").value = "";
}

document.addEventListener("DOMContentLoaded", async () => {
  ListarMeusProdutos();
});

botao_sair.addEventListener("click", async () => {
  localStorage.removeItem("id_user");
  localStorage.removeItem("nome");
  window.location.href = "../Index/index.html";
});

botao_novo_produto.addEventListener("click", async () => {
  const titulo = document.querySelector("#nome").value;
  const descricao = document.querySelector("#descricao").value;
  const preco = document.querySelector("#preco").value;
  const imagem = document.querySelector("#imagem").value;

  console.log(titulo, descricao, preco, id_user, imagem);
  const resposta = await fetch("http://localhost:3000/produtos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo,
      descricao,
      preco,
      imagem,
      id_user,
    }),
  });

  if (resposta.status == 201) {
    alert("Produto cadastrado!");
    ListarMeusProdutos();
    LimparCampos();
    return;
  }
});
