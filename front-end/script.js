const botao = document.querySelector("#botao");

botao.addEventListener("click", async () => {
  const resposta = await fetch("http://192.168.1.15:3000/perfil/1");
  const dados = await resposta.json();
  console.log(dados);
});
