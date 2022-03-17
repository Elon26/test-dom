"use strict";

const cardBody = document.querySelector('.cards__body')
let n = 0, topOrder = 0;

function createCards(color) {
	let currentTopOrder = topOrder++;
	n++;
	let requestURL = 'https://domotekhnika.ru/api/v1/news?page=' + n

	sendRequest(requestURL)
		.then(data => {
			let bottomOrder = 0
			let page = data.data.news

			for (let index = 0; index < page.length; index++) {
				const card = page[index];
				const img = card.image
				const text = card.shortText
				const dataDate = card.datePublish
				let order = 0

				if (img) {

					bottomOrder++;
					if (bottomOrder < 10) {
						order = +(String(currentTopOrder) + '0' + String(bottomOrder))
					} else {
						order = +(String(currentTopOrder) + String(bottomOrder))
					}

					const newElement = document.createElement('div');
					cardBody.append(newElement);
					newElement.outerHTML =
						`
						<div class="cards__card card" style="order: ${order}">
							<div class="card__body">
								<div href="" class="card__img">
									<img src="${img}" alt="">
								</div>
								<div href="" class="card__text">${text}</div>
								<div class="card__footer card__footer_${color}">
									<div class="card__icon icon-${color}"> </div>
									<div class="card__date">${convertDate(dataDate)}</div>
								</div>
							</div>
						</div>
						`;
				}
			}
		})
}

function sendRequest(url) {
	return fetch(url).then(response => {
		if (response.ok) {
			return response.json()
		}
	})
}

const convertDate = dataDate => {
	const newDate = new Date(dataDate);

	const dataDay = newDate.getDate();
	let day = '';
	if (String(dataDay).length == 1) {
		day = '0' + dataDay
	} else {
		day = dataDay
	}

	const dataMonth = newDate.getMonth() + 1;
	let month = '';
	if (String(dataMonth).length == 1) {
		month = '0' + dataMonth
	} else {
		month = dataMonth
	}

	const year = newDate.getFullYear();

	return `${day}.${month}.${year} г.`;
}

createCards('green');

//=================================================================

const greenButton = document.querySelector('.button_green')
const pinkButton = document.querySelector('.button_pink')
const yellowButton = document.querySelector('.button_yellow')

greenButton.addEventListener("click", function (e) {
	createCards('green');
});

pinkButton.addEventListener("click", function (e) {
	createCards('pink');
});

yellowButton.addEventListener("click", function (e) {
	createCards('yellow');
});

//=================================================================

const searchInput = document.querySelector('.search__input')

searchInput.addEventListener("input", function (e) {
	let currentInputValue = searchInput.value
	let currentCardTexts = document.querySelectorAll('.card__text')

	for (let index = 0; index < currentCardTexts.length; index++) {
		const currentCard = currentCardTexts[index];
		const currentCardText = currentCardTexts[index].innerHTML;

		if (currentCardText.toLowerCase().includes(currentInputValue.toLowerCase())) {
			currentCard.closest('.card').classList.remove('invisible')
		} else {
			currentCard.closest('.card').classList.add('invisible')
		}
	}
});

//=================================================================

/*
// Фильтр и поиск

const identifiers = [1, 4, 3, 6, 7, 2, 5, 9]

const randomString = (prefix) => `${prefix} ${Math.random()}`

const getPage = (identifier) => {
	const lines = []
	for (let i = 0; i < 20; ++i) {
		lines.push(randomString(`page = ${identifier}`))
	}
	return lines
}

const resultLoad = []

const afterGetPage = (lines, page) => {
	for (let arrItem of lines) {
		resultLoad.push(arrItem)
	}
	resultLoad.sort()
}

const getLines = search => resultLoad.filter(item => item.includes(search))


const load = () => {
	identifiers.forEach((identifier) => {
		afterGetPage(getPage(identifier), identifier)
	})
}

load()

console.log(getLines(" ").join("\n"))
*/