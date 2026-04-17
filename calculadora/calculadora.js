// 1. Selecionamos o display e todos os botões
const display = document.getElementById("display-texto");
const botoes = document.querySelectorAll(".btn-calc");

// Variáveis para armazenar os valores da conta
let valorAtual = "0";
let primeiroNumero = null;
let operacao = null;
let aguardandoSegundoNumero = false;
let calculoFinalizado = false; // Nova "chave" para controle

// 2. Adicionamos um "escutador" de eventos para cada botão
botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    const textoBotao = botao.innerText;

    if (!isNaN(textoBotao) || textoBotao === ".") {
      tratarNumero(textoBotao);
    } else {
      tratarOperacao(textoBotao);
    }
    atualizarDisplay();
  });
});

// 3. Funções de controle
function tratarNumero(num) {
  // Se o display for '0', substitui. Se não, concatena (junta) os números
  // Se terminou um cálculo e digitou um número, começa do zero
  // Se o usuário apertar "." direto após um cálculo ou no início
  if (
    (calculoFinalizado || aguardandoSegundoNumero || valorAtual === "0") &&
    num === "."
  ) {
    valorAtual = "0.";
    calculoFinalizado = false;
    aguardandoSegundoNumero = false;
    return; // Sai da função para não executar o código abaixo
  }

  // Se terminou um cálculo e digitou um número normal, começa do zero
  if (calculoFinalizado) {
    valorAtual = num;
    calculoFinalizado = false;
  }
  // Se estava esperando o segundo número da operação
  else if (aguardandoSegundoNumero) {
    valorAtual = num;
    aguardandoSegundoNumero = false;
  } else {
    // Evita colocar múltiplos pontos decimais
    if (num === "." && valorAtual.includes(".")) return;

    // Se for zero e digitar outro número, substitui (ex: de 0 para 5)
    valorAtual = valorAtual === "0" ? num : valorAtual + num;
  }
}

function tratarOperacao(comando) {
  switch (comando) {
    case "AC":
      limparTudo();
      break;
    case "+/-":
      valorAtual = String(parseFloat(valorAtual) * -1);
      break;
    case "%":
      valorAtual = String(parseFloat(valorAtual) / 100);
      break;
    case "=":
      finalizarCalculo();
      break;
    default: // Para +, -, ×, ÷
      definirOperacao(comando);
      break;
  }
}

function definirOperacao(op) {
  primeiroNumero = parseFloat(valorAtual);
  operacao = op;
  aguardandoSegundoNumero = true;
  calculoFinalizado = false; // Se eu apertar +, continuo a conta atual
}

function finalizarCalculo() {
  if (operacao === null || aguardandoSegundoNumero) return;

  const segundoNumero = parseFloat(valorAtual);
  let resultado = 0;

  if (operacao === "+") resultado = primeiroNumero + segundoNumero;
  if (operacao === "-") resultado = primeiroNumero - segundoNumero;
  if (operacao === "×") resultado = primeiroNumero * segundoNumero;
  if (operacao === "÷") {
    resultado = segundoNumero === 0 ? "Erro" : primeiroNumero / segundoNumero;
  }

  valorAtual = String(resultado);
  operacao = null;
  primeiroNumero = null;
  calculoFinalizado = true; // Ativa a trava de novo cálculo
}

function limparTudo() {
  valorAtual = "0";
  primeiroNumero = null;
  operacao = null;
  aguardandoSegundoNumero = false;
  calculoFinalizado = false;
}

function atualizarDisplay() {
  // Limita o tamanho para não estourar o display (ex: 10 dígitos)
  display.innerText = valorAtual.substring(0, 10);
}
