document.querySelector("button").addEventListener("click", async () => {
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;
  const resposta = await fetch("http://localhost:3000/usuarios/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      senha: senha,
    }),
  });

  if (resposta.status == 200) {
    return (window.location.href = "../Perfil/perfil.html");
  }
  alert("Usuario ou senha incorretos");
});
