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

function convertDate(dataDate) {
	let year = dataDate.slice(0, 4)
	let dataMonthNumber = dataDate.slice(5, 7)
	let dataDay = dataDate.slice(8, 10)

	let day;
	if (dataDay.slice(0, 1) === '0') {
		day = dataDay.slice(1, 2)
	} else {
		day = dataDay
	}

	let month;
	if (dataMonthNumber === '01') {
		month = 'января'
	} else {
		if (dataMonthNumber === '02') {
			month = 'февраля'
		} else {
			if (dataMonthNumber === '03') {
				month = 'марта'
			} else {
				if (dataMonthNumber === '04') {
					month = 'апреля'
				} else {
					if (dataMonthNumber === '05') {
						month = 'мая'
					} else {
						if (dataMonthNumber === '06') {
							month = 'июня'
						} else {
							if (dataMonthNumber === '07') {
								month = 'июля'
							} else {
								if (dataMonthNumber === '08') {
									month = 'августа'
								} else {
									if (dataMonthNumber === '09') {
										month = 'сентября'
									} else {
										if (dataMonthNumber === '10') {
											month = 'октября'
										} else {
											if (dataMonthNumber === '11') {
												month = 'ноября'
											} else {
												if (dataMonthNumber === '12') {
													month = 'декабря'
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	return `${day} ${month} ${year} г.`;
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
