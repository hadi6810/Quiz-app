const questions = [
    {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "HighText Machine Language", "Hyperlink Markup Language", "Home Tool Markup Language"],
        answer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "CSS", "Python", "React"],
        answer: 1
    },
    {
        question: "Which is not a JavaScript Framework?",
        options: ["React", "Angular", "Vue", "Python"],
        answer: 3
    }
];

let index = 0;
let score = 0;
let timeLeft = 30;
let timer;

function startQuiz() {
    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !roll || !email) {
        alert("Please fill all details!");
        return;
    }

    document.getElementById("loginPage").classList.add("hide");
    document.getElementById("quizPage").classList.remove("hide");

    showQuestion();
    startTimer();
}

function showQuestion() {
    const q = questions[index];
    document.getElementById("question").innerText = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i, btn);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    const q = questions[index];
    const buttons = document.querySelectorAll(".options button");

    buttons.forEach((b) => (b.disabled = true));

    if (selected === q.answer) {
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
        buttons[q.answer].classList.add("correct");
    }
}

function nextQuestion() {
    index++;
    if (index < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timer = setInterval(() => {
        document.getElementById("time").innerText = timeLeft;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById("quizPage").classList.add("hide");
    document.getElementById("resultPage").classList.remove("hide");
    document.getElementById("result").innerText = `You scored ${score} out of ${questions.length}`;
}
