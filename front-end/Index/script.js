window.addEventListener("load", async () => {
  const div_content = document.querySelector("#content");
  const link_entrar = document.querySelector("#profile");

  if (localStorage.getItem("nivel") == 1) {
    link_entrar.href = "../Perfil/perfil.html";
  } else if (localStorage.getItem("nivel") == 2) {
    link_entrar.href = "../Dashboard/dashboard.html";
  } else {
    link_entrar.href = "../Login/login.html";
  }

  const resposta = await fetch("http://localhost:3000/produtos");
  const produtos = await resposta.json();
  if (produtos.length == 0) {
    const mensagem = document.createElement("h1");
    mensagem.innerText = "Nenhum produto cadastrado....";

    div_content.append(mensagem);
    return;
  }
  produtos.map((p) => {
    const link = document.createElement("a");
    link.href = `../Detalhes/detalhes.html?id=${p.id}`;
    link.target = "_blank";

    const div_card = document.createElement("div");
    div_card.id = "card";

    const imagem_card = document.createElement("img");
    imagem_card.src = p.imagem;

    const titulo_card = document.createElement("h5");
    titulo_card.innerText = p.titulo;

    const preco_card = document.createElement("h6");
    preco_card.innerText = "R$ " + p.preco;

    div_card.appendChild(imagem_card);
    div_card.appendChild(titulo_card);
    div_card.appendChild(preco_card);

    link.appendChild(div_card);

    div_content.appendChild(link);
  });
});
