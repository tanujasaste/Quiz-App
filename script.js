const questions = [{
    question: "Why did the math book look sad?",
    answers: [
        { text: "I was bored", correct: false },
        { text: "It had too many problem", correct: true },
        { text: "It was lonely", correct: false },
        { text: "It was missing pages", correct: false }
    ]
},
{
    question: "What comes once in a minute,twice in a moment , but never in a thousand years?",
    answers: [
        { text: "J", correct: false },
        { text: "K", correct: false },
        { text: "C", correct: false },
        { text: "M", correct: true }
    ]
},
{
    question: "Which month has 28 days?",
    answers: [
        { text: "February", correct: false },
        { text: "January", correct: false },
        { text: "June", correct: false },
        { text: "All", correct: true }
    ]
},
{
    question: "If you throw a blue stone into the red sea, what will it become?",
    answers: [
        { text: "Blue", correct: false },
        { text: "Red", correct: false },
        { text: "wet", correct: true },
        { text: "dry", correct: false }
    ]
}
];

let que = document.querySelector("#question");
// let ans = document.querySelector(".answers");
let nextbtn = document.querySelector("#next");
let answersopt = document.querySelector(".answersopt");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    que.innerHTML = questionNo + "." + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersopt.appendChild(button);
        if(answer.correct){
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
    })
}
function resetState(){
    nextbtn.style.display = "none";
    while(answersopt.firstChild){
        answersopt.removeChild(answersopt.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.style.background = "green";
        selectedBtn.style.color = "white";
        score++;
    }
    else{
        selectedBtn.style.background = "red";
        selectedBtn.style.color = "white";

    }
    Array.from(answersopt.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.style.background = "green";
            button.style.color = "white";
        }
        button.disabled = true;
    });
    nextbtn.style.display = "block";
}

function showScore(){
    resetState();
    que.innerHTML = `You scored ${score} out of ${questions.length}`
    nextbtn.innerHTML = "Play Again!"
    nextbtn.style.display = "block"
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextbtn.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();