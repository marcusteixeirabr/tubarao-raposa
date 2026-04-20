document.getElementById("xanda-contato").addEventListener("submit", (e) => {
  e.preventDefault();

  const form = e.target; // Captura o formulário
  const formData = new FormData(form);

  // Exibe um loading enquanto envia (melhor prática de UX)
  Swal.fire({
    title: "Enviando...",
    text: "Aguarde um momento",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      // Feedback de Sucesso Bonito
      Swal.fire({
        icon: "success",
        title: "Mensagem Enviada!",
        text: "Obrigado pelo contato, responderemos em breve.",
        confirmButtonColor: "#28a745", // Cor customizada
      });
      form.reset(); // Zera o form
    })
    .catch((error) => {
      // Feedback de Erro
      Swal.fire({
        icon: "error",
        title: "Ops...",
        text: "Algo deu errado ao enviar sua mensagem.",
      });
    });
});
