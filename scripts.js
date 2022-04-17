const cards = document.querySelectorAll('.mem-card');
score = 0
round = 1

function flipCard() {
    this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard))