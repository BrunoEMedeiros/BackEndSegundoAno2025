const botao_sair = document.querySelector("#sair");
document.addEventListener("DOMContentLoaded", async () => {
  const h1_nome_usuario = document.querySelector("#nome_usuario");
  const nome = localStorage.getItem("nome");
  h1_nome_usuario.innerHTML = nome;
});

botao_sair.addEventListener("click", () => {
  localStorage.removeItem("id_user");
  localStorage.removeItem("nome");
  window.location.href = "../Index/index.html";
});
