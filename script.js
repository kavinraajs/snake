document.addEventListener('DOMContentLoaded', function () {
    const splashScreen = document.getElementById('splash-screen');
    const header = document.querySelector('header');
    const levelContainer = document.getElementById('level-container');
    const gameContainer = document.getElementById('game-container');
    const footer = document.querySelector('footer');

    const questionEl = document.getElementById('question');
    const options = document.querySelectorAll('.option');
    const scoreEl = document.getElementById('score');
    const timerEl = document.getElementById('timer');

    const homeBtn = document.getElementById('home');
    const toggleBtn = document.getElementById('toggle');

    let score = 0;
    let timer;
    let timeLeft = 15;
    let currentQuestion;
    let difficultyLevel;
    let isPaused = false;

    function showElement(element) {
        element.style.display = 'flex';
        element.style.opacity = 1;
    }

    function hideElement(element) {
        element.style.opacity = 0;
        setTimeout(() => {
            element.style.display = 'none';
        }, 500);
    }

    function startGame(difficulty) {
        score = 0;
        timeLeft = 15;
        updateScore();
        updateTimer();
        difficultyLevel = difficulty;
        nextQuestion();
        showElement(gameContainer);
        showElement(footer);
        hideElement(levelContainer);
        startTimer();
    }

    function updateScore() {
        scoreEl.textContent = score;
    }

    function updateTimer() {
        timerEl.textContent = timeLeft;
    }

    function startTimer() {
        timer = setInterval(() => {
            if (!isPaused) {
                timeLeft--;
                updateTimer();
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    alert('Time is up! Your score is ' + score);
                    resetGame();
                }
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 15;
        updateTimer();
        startTimer();
    }

    function nextQuestion() {
        const num1 = getRandomNumber(difficultyLevel);
        const num2 = getRandomNumber(difficultyLevel);
        currentQuestion = num1 + num2;
        questionEl.textContent = `${num1} + ${num2} = ?`;
        const correctOption = Math.floor(Math.random() * 4);
        options.forEach((option, index) => {
            option.textContent = index === correctOption ? currentQuestion : getRandomNumber(difficultyLevel) + getRandomNumber(difficultyLevel);
            option.onclick = index === correctOption ? correctAnswer : wrongAnswer;
        });
    }

    function getRandomNumber(difficulty) {
        switch (difficulty) {
            case 'easy':
                return Math.floor(Math.random() * 10) + 1;
            case 'medium':
                return Math.floor(Math.random() * 50) + 1;
            case 'hard':
                return Math.floor(Math.random() * 100) + 1;
        }
    }

    function correctAnswer() {
        score++;
        updateScore();
        resetTimer();
        nextQuestion();
    }

    function wrongAnswer() {
        score--;
        updateScore();
        nextQuestion();
    }

    function resetGame() {
        hideElement(gameContainer);
        hideElement(footer);
        showElement(levelContainer);
        clearInterval(timer);
    }

    function togglePauseResume() {
        isPaused = !isPaused;
        toggleBtn.innerHTML = isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
        toggleBtn.style.backgroundColor = isPaused ? 'green' : 'yellowgreen';
    }

    document.getElementById('easy').onclick = () => startGame('easy');
    document.getElementById('medium').onclick = () => startGame('medium');
    document.getElementById('hard').onclick = () => startGame('hard');

    homeBtn.onclick = resetGame;
    toggleBtn.onclick = togglePauseResume;

    setTimeout(() => {
        hideElement(splashScreen);
        showElement(header);
        showElement(levelContainer);
    }, 2000);
});
