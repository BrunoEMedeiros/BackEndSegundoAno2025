const botao_sair = document.querySelector("#sair");

document.addEventListener("DOMContentLoaded", async () => {
  const h1_nome_usuario = document.querySelector("#nome_usuario");
  const id = localStorage.getItem("id_user");
  const nome = localStorage.getItem("nome");
  h1_nome_usuario.innerHTML = nome;

  const div_content = document.querySelector("#content");
  const resposta = await fetch(`http://localhost:3000/usuarios/compras/${id}`);
  if (resposta.status == 200) {
    const compras = await resposta.json();
    compras.map((compra) => {
      const div_card = document.createElement("div");
      div_card.id = "card";

      const imagem_card = document.createElement("img");
      imagem_card.src = compra.imagem;

      const titulo_card = document.createElement("h5");
      titulo_card.innerText = compra.titulo;

      const preco_card = document.createElement("h6");
      preco_card.innerText = "R$ " + compra.total;

      console.log(compra.data_venda);
      const date = new Date(compra.data_venda);

      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC",
      };

      const dataFormatada = date.toLocaleDateString("pt-BR", options);

      const data_venda = document.createElement("h6");
      data_venda.innerText = "Comprado em: " + dataFormatada;

      const div_preco_data = document.createElement("div");

      div_preco_data.appendChild(preco_card);
      div_preco_data.appendChild(data_venda);

      div_card.appendChild(imagem_card);
      div_card.appendChild(titulo_card);
      div_card.appendChild(div_preco_data);

      div_content.appendChild(div_card);
    });
  }
});

botao_sair.addEventListener("click", () => {
  localStorage.removeItem("id_user");
  localStorage.removeItem("nome");
  window.location.href = "../Index/index.html";
});
