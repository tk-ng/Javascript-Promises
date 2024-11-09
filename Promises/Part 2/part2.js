let baseURL = "https://deckofcardsapi.com/api/deck";

// 1.
async function drawACard() {
	let res = await axios.get(`${baseURL}/new/draw/?count=1`);
	let { suit, value } = res.data.cards[0];
	console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}

drawACard();
// 2.
async function draw2Cards() {
	let res = await axios.get(`${baseURL}/new/draw/?count=1`);
	let { deck_id } = res.data;
	let card1 = res.data.cards[0];
	res = await axios.get(`${baseURL}/${deck_id}/draw/`);
	let card2 = res.data.cards[0];
	for (c of [card1, card2]) {
		console.log(`${c.value.toLowerCase()} of ${c.suit.toLowerCase()}`);
	}
}

draw2Cards();

// 3.
let deckId = null;
let btn = document.querySelector("button");
let cardArea = document.querySelector("#card-area");

async function getDeck() {
	let res = await axios.get(`${baseURL}/new/shuffle/`);
	deckId = res.data.deck_id;
	btn.style.display = "block";
}

getDeck();

btn.addEventListener("click", async function () {
	let res = await axios.get(`${baseURL}/${deckId}/draw/`);
	let cardSrc = res.data.cards[0].image;
	let angle = Math.random() * 90 - 45;
	let randomX = Math.random() * 40 - 20;
	let randomY = Math.random() * 40 - 20;
	img = document.createElement("img");
	img.setAttribute("src", cardSrc);
	img.setAttribute(
		"style",
		`transform: translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
	);
	cardArea.append(img);
	if (res.data.remaining === 0) btn.remove();
});
