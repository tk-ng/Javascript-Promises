let baseURL = "https://deckofcardsapi.com/api/deck";

// 1.
axios.get(`${baseURL}/new/draw/?count=1`).then((res) => {
	let { suit, value } = res.data.cards[0];
	console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
});

// 2.
let card1;
axios
	.get(`${baseURL}/new/draw/?count=1`)
	.then((res) => {
		let { deck_id } = res.data;
		card1 = res.data.cards[0];
		return axios.get(`${baseURL}/${deck_id}/draw/`);
	})
	.then((res) => {
		let card2 = res.data.cards[0];
		for (c of [card1, card2]) {
			console.log(`${c.value.toLowerCase()} of ${c.suit.toLowerCase()}`);
		}
	});

// 3.
let deckId = null;
let btn = document.querySelector("button");
let cardArea = document.querySelector("#card-area");

axios.get(`${baseURL}/new/shuffle/`).then((res) => {
	deckId = res.data.deck_id;
	btn.style.display = "block";
});

btn.addEventListener("click", function () {
	axios.get(`${baseURL}/${deckId}/draw/`).then((res) => {
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
});
