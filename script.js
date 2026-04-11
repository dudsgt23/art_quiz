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

const quizQuestions = [
  {
    question: "Quem pintou este quadro?",
    answers: [
      { text: "Monet", correct: false },
      { text: "Picasso", correct: false },
      { text: "Caravaggio", correct: false },
      { text: "Van Gogh", correct: true },
    ],
  },
  {
    question: "Bem fácil: que dia é o nosso aniversário de namoro?",
    answers: [
      { text: "21/11", correct: false },
      { text: "22/11", correct: false },
      { text: "23/11", correct: true },
      { text: "24/06", correct: false },
    ],
  },
  {
    question: "Qual o dia do meu aniversário?",
    answers: [
      { text: "21/02", correct: false },
      { text: "23/02", correct: true },
      { text: "21/03", correct: false },
      { text: "23/03", correct: false },
    ],
  },
  {
    question: "Opções de dates legais: 🌹🌹",
    answers: [
      { text: "Massagem", correct: false },
      { text: "Jantarzinho delis", correct: false },
      { text: "Conversar na varanda", correct: false },
      { text: "Todas opções acima", correct: true },
    ],
  },
  {
    question: "Opções de dates legais: 🌹🌹",
    answers: [
      { text: "Massagem", correct: false },
      { text: "Jantarzinho delis", correct: false },
      { text: "Conversar na varanda", correct: false },
      { text: "Todas opções acima", correct: true },
    ],
  },  {
    question: "Opções de dates legais: 🌹🌹",
    answers: [
      { text: "Massagem", correct: false },
      { text: "Jantarzinho delis", correct: false },
      { text: "Conversar na varanda", correct: false },
      { text: "Todas opções acima", correct: true },
    ],
  },
  {
    question: "Pergunta decisiva: De onde vem o café mais gostoso do Brasil?",
    answers: [
      { text: "São Paulo", correct: false },
      { text: "Rio de Janeiro", correct: false },
      { text: "Minas Gerais", correct: true },
      { text: "Sergipe", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
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

    // check if there are more questions or if the quiz is over
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

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Brilhouu! Ganha um brigadeiro.";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Marromenos, dá pra melhorar!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Hmm, 5 bola aqui NÃO é 10";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Buhhhh! 👎";
  } else {
    resultMessage.textContent = "Buhhhh! 👎";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
