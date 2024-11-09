let favNum = 23;
let baseURL = "http://numbersapi.com";
let body = document.querySelector("body");

// 1.
axios.get(`${baseURL}/${favNum}?json`).then((res) => console.log(res.data));

// 2.
let favNums = [23, 31, 95];
axios.get(`${baseURL}/${favNums}?json`).then((res) => console.log(res.data));

// 3.
let fourNumFacts = [];
for (let i = 1; i < 5; i++) {
	fourNumFacts.push(axios.get(`${baseURL}/${favNum}?json`));
}

Promise.all(fourNumFacts).then((factsArr) => {
	for (f of factsArr) {
		let li = document.createElement("li");
		li.innerText = f.data.text;
		body.append(li);
	}
});
