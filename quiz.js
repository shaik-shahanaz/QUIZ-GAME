const questions = {
  science: [
    {
      question: "What is H2O commonly known as?",
      options: ["Oxygen", "Hydrogen", "Water", "Salt"],
      correct: 2
    },
    {
      question: "What planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      correct: 1
    },
    {
      question: "What gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
      correct: 1
    },
    {
      question: "What part of the plant conducts photosynthesis?",
      options: ["Root", "Stem", "Leaf", "Flower"],
      correct: 2
    },
    {
      question: "How many legs do insects have?",
      options: ["4", "6", "8", "10"],
      correct: 1
    },
    {
      question: "What is the boiling point of water?",
      options: ["100°C", "90°C", "80°C", "70°C"],
      correct: 0
    },
    {
      question: "Which vitamin is produced when a person is exposed to sunlight?",
      options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
      correct: 2
    },
    {
      question: "What organ pumps blood throughout the human body?",
      options: ["Lungs", "Heart", "Liver", "Kidneys"],
      correct: 1
    },
    {
      question: "Which gas is essential for human respiration?",
      options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
      correct: 1
    },
    {
      question: "What is the primary source of energy for the Earth?",
      options: ["Wind", "Coal", "Sun", "Water"],
      correct: 2
    }
  ],
  gk: [
    {
      question: "Who is the Prime Minister of India (2024)?",
      options: ["Narendra Modi", "Rahul Gandhi", "Amit Shah", "Arvind Kejriwal"],
      correct: 0
    },
    {
      question: "Which country is called the Land of Rising Sun?",
      options: ["China", "Japan", "Thailand", "India"],
      correct: 1
    },
    {
      question: "What is the national bird of India?",
      options: ["Parrot", "Crow", "Peacock", "Sparrow"],
      correct: 2
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correct: 2
    },
    {
      question: "Which festival is known as the Festival of Lights?",
      options: ["Holi", "Diwali", "Eid", "Christmas"],
      correct: 1
    },
    {
      question: "In which year did India gain independence?",
      options: ["1947", "1950", "1930", "1942"],
      correct: 0
    },
    {
      question: "Who wrote the Indian national anthem?",
      options: ["Bankim Chandra", "Sarojini Naidu", "Rabindranath Tagore", "Subhash Chandra Bose"],
      correct: 2
    },
    {
      question: "Which continent is the Sahara Desert located in?",
      options: ["Asia", "Africa", "Australia", "Europe"],
      correct: 1
    },
    {
      question: "What is the currency of Japan?",
      options: ["Yen", "Won", "Dollar", "Euro"],
      correct: 0
    },
    {
      question: "Which is the largest ocean in the world?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      correct: 2
    }
  ]
};



let currentCategory = '';
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let timerInterval;
let timeLeft = 15;

function startQuiz(category) {
  currentCategory = category;
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  document.getElementById('category-screen').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timerInterval);
  timeLeft = 15;
  document.getElementById("timer").innerText = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      selectAnswer(-1); // time-out, no answer selected
    }
  }, 1000);

  const q = questions[currentCategory][currentQuestion];
  document.getElementById("question").innerText = q.question;
  document.querySelectorAll(".option-btn").forEach((btn, i) => {
    btn.innerText = q.options[i];
    btn.disabled = false;
    btn.style.backgroundColor = "#4caf50";
  });
}

function selectAnswer(index) {
  clearInterval(timerInterval);
  const q = questions[currentCategory][currentQuestion];
  const correctIndex = q.correct;

  document.querySelectorAll(".option-btn").forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.style.backgroundColor = "green";
    else if (i === index) btn.style.backgroundColor = "red";
  });

  userAnswers.push({
    question: q.question,
    selected: index,
    correct: correctIndex,
    options: q.options
  });

  if (index === correctIndex) score++;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions[currentCategory].length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").style.display = "none";
  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  let feedback = `<h2>Your Score: ${score}/${questions[currentCategory].length}</h2><hr/>`;
  feedback += "<h3>Answer Review:</h3><ul>";

  userAnswers.forEach((ans, i) => {
    const correctText = ans.options[ans.correct];
    const selectedText = ans.selected !== -1 ? ans.options[ans.selected] : "No Answer";
    const status = ans.selected === ans.correct ? "✅" : "❌";
    feedback += `<li>
      <b>Q${i + 1}: ${ans.question}</b><br>
      Your Answer: ${selectedText}<br>
      Correct Answer: ${correctText} ${status}
    </li><br>`;
  });

  feedback += `</ul><button onclick="location.reload()">Play Again</button>`;
  resultDiv.innerHTML = feedback;
}
