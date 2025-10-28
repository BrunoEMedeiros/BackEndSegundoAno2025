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
    const usuario = await resposta.json();
    console.log(usuario);
    localStorage.setItem("id_user", usuario.id);
    localStorage.setItem("nome", usuario.nome);
    return (window.location.href = "../Perfil/perfil.html");
  } else {
    alert("Usuario ou senha incorretos");
  }
});
