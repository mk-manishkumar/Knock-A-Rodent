const homeBtn = document.querySelector("#home-btn");
const homeBtnSection = document.querySelector(".homeBtn");
const displayAll = document.querySelector(".displayAll");
const newGame = document.querySelector("#newGame");
const pauseResume = document.querySelector("#pauseResume");
const highScore = document.querySelector("#highScore");
const currentScore = document.querySelector("#currentScore");
const timeLeft = document.querySelector("#timeLeft");
const exitGame = document.querySelector("#exitGame");
const box = document.querySelectorAll(".box");

// after clicking start game button at home page
homeBtn.addEventListener("click", () => {
  homeBtnSection.style.display = "none";
  displayAll.style.display = "block";
  displayAll.style.marginTop = "2rem";
  displayAll.style.marginBottom = "1rem";
});

// after clicking exit button at game screen
exitGame.addEventListener("click", () => {
  window.close();
});
