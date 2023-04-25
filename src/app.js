const homeBtn = document.querySelector("#home-btn");
const homeBtnSection = document.querySelector(".homeBtn");
const displayAll = document.querySelector(".displayAll");
const restart = document.querySelector("#restart");
const exitGame = document.querySelector("#exitGame");
const timeBox = document.querySelector(".timeBox");
const body = document.querySelector("body");

let pauseResume = document.querySelector("#pauseResume");
let highScore = document.querySelector("#highScore");
let currentScore = document.querySelector("#currentScore");
let timeLeft = document.querySelector("#timeLeft");
let boxes = document.querySelectorAll(".box");
let gameMusic = new Audio("../assets/gameMusic.mp3");
let hitMusic = new Audio("../assets/hitMusic.mp3");
let allBox = document.getElementsByClassName("boxes")[0];

let currentScoreValue = 0;
let highScoreValue = 0;
let timeLeftNow = 60;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;

// after clicking start game button at home page
homeBtn.addEventListener("click", () => {
  homeBtnSection.style.display = "none";
  displayAll.style.display = "block";
  displayAll.style.marginTop = "2rem";
  displayAll.style.marginBottom = "1rem";
  startGame();
});

// randomly place mole
const randomMole = () => {
  boxes.forEach((box) => box.classList.remove("mole"));

  let randomBox = boxes[Math.floor(Math.random() * boxes.length)];
  randomBox.classList.add("mole");
  hitPosition = randomBox.id;
};

// function for countdown timer
const countDown = () => {
  timeLeftNow--;
  timeLeft.textContent = `${timeLeftNow}`;

  if (timeLeftNow === 0) {
    clearInterval(timerId);
    clearInterval(randomMoleId);
    allBox.style.display = "none";
    timeBox.style.display = "none";
    pauseResume.style.display = "none";
    restart.textContent = "New Game";
    body.style.background = "#8D3DAF";
    // update high score
    updateHighScore(currentScoreValue);
  }
};

randomMole();

// function for starting a game
const startGame = () => {
  body.style.background = "#22CB5C";
  allBox.style.display = "grid";
  timeBox.style.display = "inline";
  pauseResume.style.display = "inline";
  restart.textContent = "Restart";

  currentScoreValue = 0;
  timeLeftNow = 60;

  currentScore.textContent = "0";
  timeLeft.innerHTML = "60";
  allBox.style.display = "grid";
  pauseResume.innerHTML = "Pause";
  gameMusic.play();
  timerId = setInterval(randomMole, 1000);
  randomMoleId = setInterval(countDown, 1000);
};

// function for pausing and resuming a game
const pauseResumeGame = () => {
  if (pauseResume.textContent === "Pause") {
    gameMusic.pause();
    clearInterval(timerId);
    clearInterval(randomMoleId);
    timerId = null;
    randomMoleId = null;
    pauseResume.textContent = "Resume";
  } else {
    gameMusic.play();
    timerId = setInterval(randomMole, 1000);
    randomMoleId = setInterval(countDown, 1000);
    pauseResume.textContent = "Pause";
  }
};

// function for checking hit effect on mole
boxes.forEach((box) => {
  box.addEventListener("mousedown", () => {
    if (timerId !== null) {
      if (box.id === hitPosition) {
        hitMusic.play();
        setTimeout(() => {
          hitMusic.pause();
        }, 1000);
        currentScoreValue++;
        currentScore.textContent = `${currentScoreValue}`;
        hitPosition = null;
      }
    }
  });
});

// When the window finishes loading, retrieve the high score value from localStorage and set it as the text content of the highScore element, if it exists.
window.addEventListener("load", () => {
  highScoreValue = localStorage.getItem("highScore") || 0;
  highScore.textContent = `${highScoreValue}`;
});

// function for high score and storing it on local storage
const updateHighScore = (currentScoreValue) => {
  if (highScoreValue < currentScoreValue) {
    highScoreValue = currentScoreValue;
    highScore.textContent = `${highScoreValue}`;
    localStorage.setItem("highScore", highScoreValue);
  }
};

// after clicking exit button at game screen
exitGame.addEventListener("click", () => location.reload());

// after clicking pause/resume button at game screen
pauseResume.addEventListener("click", pauseResumeGame);

// after clicking restart button at game screen
restart.addEventListener("click", startGame);
