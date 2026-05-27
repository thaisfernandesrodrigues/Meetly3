/* encontra o botão no HTML através do ID*/
const botao = document.getElementById('btn-navegar');

/*função para quando for clicado*/
botao.addEventListener('click', function() {
  
  /*aqui você pode colocar qualquer lógica antes de ir para a página!*/
  console.log("O usuário clicou! Redirecionando...");
  
  /* faz o navegador mudar de página */
  window.location.href = "pag2.html";
});
