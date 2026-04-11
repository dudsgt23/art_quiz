// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
// NOVO: seletores para os elementos do layout alternado
const quizLayout = document.getElementById("quiz-layout");       // container que recebe a classe .flip
const quizImagePanel = document.getElementById("quiz-image-panel"); // painel da imagem
const quizImage = document.getElementById("quiz-image");         // a tag <img> dentro do painel
const imageCaption = document.getElementById("image-caption");   // legenda sobreposta à imagem

const quizQuestions = [
  {
    question: "Quem pintou este quadro?",
    answers: [
      { text: "Monet", correct: false },
      { text: "Picasso", correct: false },
      { text: "Dali", correct: false },
      { text: "Van Gogh", correct: true },
    ],
    // NOVO: cada pergunta agora tem image e caption.
    // O JS usa esses campos para atualizar o painel da imagem a cada pergunta.
    image: "vangogh.jpg",
    caption: "Noite Estrelada sobre o Ródano, 1888",
  },
  {
    question: "Quem pintou o teto da Capela Sistina?",
    answers: [
      { text: "Caravaggio", correct: false },
      { text: "Michelangelo", correct: true },
      { text: "da Vinci", correct: false },
      { text: "Botticelli", correct: false },
    ],
    image: "capela_sistina.jpg",
    caption: "",
  },
  {
    question: "Marcado pelo uso intenso de contrastes de luz e sombra (chiaroscuro), temas religiosos, mitológicos e pela tendência ao ornamental e ao emocionalmente expressivo, qual é o movimento artístico representado pelo quadro?",
    answers: [
      { text: "Renascimento", correct: false },
      { text: "Barroco", correct: true },
      { text: "Realismo", correct: false },
      { text: "Impressionismo", correct: false },
    ],
    image: "Saint_Jerome_Writing-Caravaggio_(1605-6).jpg",
    caption: "São Jerônimo escrevendo, Caravaggio, 1605-1606",
  },
  {
    question: "Quem pintou o seguinte quadro?",
    answers: [
      { text: "Berthe Morisot", correct: false },
      { text: "Edgar Degas", correct: false },
      { text: "Jean Baptiste", correct: false },
      { text: "Claude Monet", correct: true },
    ],
    image: "Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg",
    caption: "Mulher com uma sombrinha, 1875",
  },
  {
    // NOVO: pergunta adicionada (substituiu uma das três perguntas duplicadas do original)
    question: "Qual estilo artístico caracteriza Monet?",
    answers: [
      { text: "Cubismo", correct: false },
      { text: "Impressionismo", correct: true },
      { text: "Surrealismo", correct: false },
      { text: "Barroco", correct: false },
    ],
    image: "Claude_Monet,_Impression,_soleil_levant,_1872.jpg",
    caption: "Foco na luz solar e seus efeitos nas cores e a Pintura ao Ar Livre",
  },
  {
    question: "\"Pietà\"\ de Michelangelo, representa qual movimento artístico?",
    answers: [
      { text: "Realismo", correct: false },
      { text: "Barroco", correct: false },
      { text: "Renascimento", correct: true },
      { text: "Surrealismo", correct: false },
    ],
    image: "Michelangelo's_Pieta_5450_cropncleaned_edit.jpg",
    caption: "",
  },
  {
    // NOVO: pergunta adicionada (substituiu outra das perguntas duplicadas do original)
    question: "O Renascimento é caracterizado por?",
    answers: [
      { text: "distorção das formas, cores vibrantes/intensas e temáticas trágicas, retratando a angústia existencial do ser humano moderno", correct: false },
      { text: "Antropocentrismo, racionalismo, valorização da antiguidade clássica e realismo artístico com uso de perspectiva.", correct: true },
      { text: "Realismo, crítica social, verossimilhança, impessoalidade, e sem idealizações", correct: false },
      { text: "Drama, contraste intenso entre luz e sombra (claro-escuro), emoção exagerada, detalhes rebuscados e movimento", correct: false },
    ],
    image: "Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    caption: "Nascumento de Vênus, Botticelli, 1485",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // NOVO: animação de transição da imagem entre perguntas.
  // Adiciona .fade-out → a imagem fica transparente/ampliada via CSS.
  // Após 350ms (tempo da transição CSS), troca o src e remove a classe.
  quizImagePanel.classList.add("fade-out");

  setTimeout(() => {
    // Atualiza a imagem e a legenda com os dados da pergunta atual
    if (currentQuestion.image) {
      quizImage.src = currentQuestion.image;
      quizImagePanel.style.display = "";
    } else {
      quizImagePanel.style.display = "none"; // esconde o painel se não houver imagem
    }

    imageCaption.textContent = currentQuestion.caption || "";

    // NOVO: alterna o layout a cada pergunta usando o operador módulo (%).
    // Índices pares (0, 2, 4...) → layout padrão: imagem esquerda, texto direita.
    // Índices ímpares (1, 3, 5...) → layout invertido (.flip): texto esquerda, imagem direita.
    if (currentQuestionIndex % 2 === 0) {
      quizLayout.classList.remove("flip");
    } else {
      quizLayout.classList.add("flip");
    }

    quizImagePanel.classList.remove("fade-out"); // dispara a animação de entrada
  }, 350);

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  maxScoreSpan.textContent = quizQuestions.length; // NOVO: garante que o total é sempre atualizado

  const percentage = (score / quizQuestions.length) * 100;

  // ALTERADO: mesma lógica de porcentagem do original, mas com textos diferentes
  if (percentage === 100) {
    resultMessage.textContent = "Perfeito! Você brilhou como Van Gogh numa noite estrelada. 🌟";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Muito bem! Quase lá, mais um esforço.";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Hmm, 5 bola aqui NÃO é 10. Tenta de novo!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Buhhhh! 👎 Dá uma revisada antes de tentar de novo.";
  } else {
    resultMessage.textContent = "Oof. Isso foi difícil, né? Dá uma revisada antes de tentar de novo.";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}