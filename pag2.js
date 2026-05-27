const inputNome = document.getElementById('nome');
const btnConfirmar = document.getElementById('confirmarBtn');
const btnCancelar = document.getElementById('cancelarBtn');
const tagMensagem = document.getElementById('mensagem');
const tabelaCorpo = document.getElementById('tabelaCorpo');

/*painel*/ 
const txtTotal = document.getElementById('totalHorarios');
const txtDisponiveis = document.getElementById('totalDisponiveis');
const txtAgendados = document.getElementById('totalAgendados');

/*array*/ 
let horarios = [
  { hora: "08:00", status: "Disponível", participante: "-" },
  { hora: "09:00", status: "Disponível", participante: "-" },
  { hora: "10:00", status: "Disponível", participante: "-" },
  { hora: "14:00", status: "Disponível", participante: "-" },
  { hora: "15:00", status: "Disponível", participante: "-" },
  { hora: "16:00", status: "Disponível", participante: "-" },
  { hora: "17:00", status: "Disponível", participante: "-" },
  { hora: "19:00", status: "Disponível", participante: "-" },
  { hora: "20:00", status: "Disponível", participante: "-" }
];

/*guarda o índice do horário selecionado no momento*/
let indiceSelecionado = null;

/* função para a tabela e atualizar*/ 
function renderizarTabela() {
  tabelaCorpo.innerHTML = ""; /* essa função limpa a tabela antiga*/ 
  
  let contDisponiveis = 0;
  let contAgendados = 0;

  horarios.forEach(function(item, indice) {
    /*contagem do resumo*/ 
    if (item.status === "Disponível") contDisponiveis++;
    if (item.status === "Agendado") contAgendados++;

    /*verificação do click do usuario*/ 
    let classeLinha = "";
    if (indice === indiceSelecionado) {
      classeLinha = "linha-selecionada";
    }

    /*mostra a ação escolher ou liberar passagem*/
    let textoBotao = "Escolher";
    let classeBotao = "btn-escolher";
    let acaoBotao = `selecionarHorario(${indice})`;

    if (item.status === "Agendado") {
      textoBotao = "Liberar";
      classeBotao = "btn-liberar";
      acaoBotao = `liberarHorario(${indice})`;
    }

    /*fazendo a estrutura da linha com template string*/
    const classeStatus = item.status === "Agendado" ? "texto-agendado" : "";
    
    tabelaCorpo.innerHTML += `
      <tr class="${classeLinha}">
        <td>${item.hora}</td>
        <td class="${classeStatus}">${item.status}</td>
        <td>${item.participante}</td>
        <td><button class="${classeBotao}" onclick="${acaoBotao}">${textoBotao}</button></td>
      </tr>
    `;
  });

  /*atualização do painel*/ 
  txtTotal.textContent = horarios.length;
  txtDisponiveis.textContent = contDisponiveis;
  txtAgendados.textContent = contAgendados;
}

/*escolher*/ 
window.selecionarHorario = function(indice) {
  indiceSelecionado = indice;
  tagMensagem.textContent = "";
  renderizarTabela(); /*destaque da linha*/ 
};

/*liberar*/ 
window.liberarHorario = function(indice) {
  horarios[indice].status = "Disponível";
  horarios[indice].participante = "-";
  
  /*liberação com sucesso*/ 
  if (indiceSelecionado === indice) {
    indiceSelecionado = null;
  }

  tagMensagem.style.color = "green";
  tagMensagem.textContent = "Horário liberado com sucesso!";
  renderizarTabela();
};

/*confirmar botao*/ 
btnConfirmar.addEventListener('click', function() {
  const nomeDigitado = inputNome.value.trim();

  /*vendo se os horarios estão vazios*/ 
  if (indiceSelecionado === null) {
    tagMensagem.style.color = "red";
    tagMensagem.textContent = "Por favor, escolha um horário na tabela antes de confirmar.";
    return;
  }

  /*vendo se o nome está vazio*/ 
  if (nomeDigitado === "") {
    tagMensagem.style.color = "red";
    tagMensagem.textContent = "Por favor, preencha o seu nome antes de confirmar.";
    return; 
  }

  /*atualiza o array*/
  horarios[indiceSelecionado].status = "Agendado";
  horarios[indiceSelecionado].participante = nomeDigitado;

  tagMensagem.style.color = "green";
  tagMensagem.textContent = `Reunião agendada para ${nomeDigitado} às ${horarios[indiceSelecionado].hora}.`;

  /*resetando a linha*/
  inputNome.value = "";
  indiceSelecionado = null;
  
  /*atualiza a tabela*/ 
  renderizarTabela();
});

/*cancelar*/ 
btnCancelar.addEventListener('click', function() {
  /*limpanndo*/ 
  indiceSelecionado = null;
  inputNome.value = "";
  tagMensagem.textContent = "";
  renderizarTabela();
});

/*inicialização da pag*/ 
renderizarTabela();
