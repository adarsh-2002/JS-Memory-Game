const cards = document.querySelectorAll(".mem-card");
score = 0;
flips = 0;
const scoreEl = document.getElementById("score");
const flipEl = document.getElementById("flips");
round = 1;
let hasFlipped = false;
let firstCard, secondCard;
let lockBoard = false;

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
  flipEl.innerText = flips;
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
    score += 1;
    if (score == 12) gameOver();
    scoreEl.innerText = score;
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

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    });
})();

function gameOver() {
    setTimeout(() => {
        window.alert("Game over");
    }, 500);
}

cards.forEach((card) => card.addEventListener("click", flipCard));
