
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