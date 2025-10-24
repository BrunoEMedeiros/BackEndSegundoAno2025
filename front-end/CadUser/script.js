document.querySelector("button").addEventListener("click", async () => {
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;
  const nome = document.querySelector("#nome").value;

  const res = await fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome,
      email,
      senha,
    }),
  });

  if (res.status == 201) {
    alert("Cadastrado");
  }
});
