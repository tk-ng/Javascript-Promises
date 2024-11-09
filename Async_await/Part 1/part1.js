let baseURL = "http://numbersapi.com";
let body = document.querySelector("body");

// 1.
async function getAFact(favNum) {
	let res = await axios.get(`${baseURL}/${favNum}?json`);
	console.log(res.data);
}

getAFact(23);

// 2.
async function getMultiNumFacts(favNums) {
	let res = await axios.get(`${baseURL}/${favNums}?json`);
	console.log(res.data);
}

let favNums = [23, 31, 95];
getMultiNumFacts(favNums);

// 3.
async function get4Facts(favNum) {
	let res = await Promise.all(
		Array.from({ length: 4 }, () => axios.get(`${baseURL}/${favNum}?json`))
	);
	for (f of res) {
		let li = document.createElement("li");
		li.innerText = f.data.text;
		body.append(li);
	}
}

get4Facts(23);
