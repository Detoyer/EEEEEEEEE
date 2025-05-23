const cards = document.querySelectorAll('.memory-card')

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard;

(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false]
	[firstCard, secondCard] = [null, null]
}

function unflipCards() {
	lockBoard = true

	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
	}, 1500);
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard()
}

function checkForMatch() {
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
	
	isMatch ? disableCards() : unflipCards();
}

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if (!hasFlippedCard){
		hasFlippedCard = true;
		firstCard = this;

		return;
	}

	secondCard = this;
	checkForMatch();
}

cards.forEach(card => card.addEventListener('click', flipCard))