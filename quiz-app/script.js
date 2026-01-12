const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Trainer Marking Language",
            "Hyper Text Markup Language",
            "Hyper Text Marketing Language",
            "Hyper Tool Markup Language"
        ],
        correct: 1
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        correct: 2
    },
    {
        question: "Which is not a JavaScript framework?",
        options: ["Python Script", "JQuery", "Django", "NodeJS"],
        correct: 2
    },
    {
        question: "Which tag is used to link JavaScript?",
        options: ["<js>", "<script>", "<javascript>", "<link>"],
        correct: 1
    },
    {
        question: "Inside which HTML element do we put CSS?",
        options: ["<css>", "<style>", "<script>", "<link>"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);

function startQuiz() {
    startBtn.style.display = "none";
    nextBtn.style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    selectedOption = null;
    optionsEl.innerHTML = "";
    questionEl.textContent = quizData[currentQuestion].question;

    quizData[currentQuestion].options.forEach((option, index) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = option;

        div.addEventListener("click", () => selectOption(div, index));
        optionsEl.appendChild(div);
    });
}

function selectOption(element, index) {
    document.querySelectorAll(".option").forEach(opt =>
        opt.classList.remove("selected")
    );
    element.classList.add("selected");
    selectedOption = index;
}

function nextQuestion() {
    if (selectedOption === null) {
        alert("Please select an option");
        return;
    }

    if (selectedOption === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionEl.textContent = "Quiz Completed!";
    optionsEl.innerHTML = `<h3>Your Score: ${score} / ${quizData.length}</h3>`;
    nextBtn.style.display = "none";
}
