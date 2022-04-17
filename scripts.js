const cards = document.querySelectorAll(".mem-card");
const scoreEl = document.getElementById("score");
const flipEl = document.getElementById("flips");
const pointEl = document.getElementById("points");
const timerEl = document.getElementById("timer");
const roundEl = document.getElementById("round");
const levelTimerEl = document.getElementById("level-timer");

let hasFlipped = false;
let firstCard, secondCard;
let lockBoard = false;
let timeLeft = 300;

cardsMatched = 0;
flips = 0;
points = 0;
round = 1;
timer = 300;
timers = [300, 180, 60];
var theActualTimer;

function gameStart(round = 1) {
  theActualTimer = setInterval(updateTimer, 1000);
  document.getElementById("start-msg").style.display = "none";
  cards.forEach((card) => card.addEventListener("click", flipCard));
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.style.visibility = "visible";
  });
  cardsMatched = 0;
  flips = 0;
  points = 0;
  round = round;
  timer = timers[round - 1];
  timeLeft = timer;
  updateBoard();
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    });
})();

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlipped) {
    //first click
    hasFlipped = true;
    firstCard = this;
    return;
  }
  //second click
  //increment no. of flip attempts
  flips += 1;
  calcPoints();
  hasFlipped = false;
  secondCard = this;
  //check match
  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    //cards match
    disableCards();
    //increment score
    cardsMatched += 2;
    calcPoints();
    if (cardsMatched == 24) gameOver();
    updateBoard();
  } else {
    resetFlip();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  lockBoard = true;
  setTimeout(() => {
    firstCard.style.visibility = "hidden";
    secondCard.style.visibility = "hidden";
    resetBoard();
  }, 500);
}

function resetFlip() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function gameOver() {
  cards.forEach((card) => card.removeEventListener("click", flipCard));
  setTimeout(() => {
    if (cardsMatched == 24) {
      if (round === 3) {
        window.alert("You have cleared all 3 rounds!! Press OK to restart.");
        location.reload();
        return;
      }
      window.alert("Level Cleared!! Press OK to start next round.");
      round += 1;
      timer = timers[round - 1];
      gameStart(round);
      return;
    } else {
      window.alert("Level failed!! Press OK to restart.");
      location.reload();
    }
  }, 500);
}

function calcPoints() {
  points = (cardsMatched / flips) * 50;
  updateBoard();
}

function updateBoard() {
  scoreEl.innerText = cardsMatched;
  flipEl.innerText = flips;
  pointEl.innerText = Math.floor(points);
  roundEl.innerText = round;
  levelTimerEl.innerText = timers[round - 1];
}

function updateTimer() {
  timeLeft = timeLeft - 1;
  if (timeLeft >= 0) timerEl.innerText = timeLeft;
  else {
    gameOver();
  }
}
