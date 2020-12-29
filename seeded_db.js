const faker = require('faker')

/**
 * Data generator module. Creates some random book data to test the app
 * @module data/generator
 */
module.exports = () => {
	/**
	 * Generate a random integer number between 0 and an upper bound
	 * @param {number} max The max bound for the generated number.
	 * @returns {number} The generated random integer.
	 */
	const getRandomInt = max => {
		return Math.floor(Math.random() * Math.floor(max))
	}

	const data = { books: [] }
	/**
	 * Generate a list of tags.
	 * @param {number} [maxTagCount=3] The maximum number of tags per book. Defaults to three.
	 * @param {number} [availableTags] The tag list from which to pick. Defaults to the presented list.
	 * @returns {string[]} The sum of the two numbers.
	 */
	const getTags = (
		maxTagCount = 3,
		availableTags = [
			'FICTION',
			'MISTERY',
			'DRAMA',
			'SCI-FI',
			'FANTASY',
			'ADVENTURE',
			'TECHNICAL',
			'ROMANCE',
			'HORROR',
			'SHORT',
			'COOKING',
		]
	) => {
		const maxTagIndex = availableTags.length - 1

		const tagCount = getRandomInt(maxTagCount)
		const tags = new Set() // using a Set facilitates preventing repeat values

		// if tagCount is zero and therefore falsy, shortcircuit the conditional and skip
		while (tagCount && tags.size <= tagCount) {
			const nextTagIndex = getRandomInt(maxTagIndex)
			const nextTag = availableTags[nextTagIndex]

			tags.add(nextTag) // if tags already contains nextTag, the Set size remains the same and execution continues
		}

		return Array.from(tags) // convert the set to an array before returning
	}

	// Create 1000 books
	for (let i = 0; i < 1000; i++) {
		data.books.push({
			id: i,
			title: faker.company.catchPhrase(),
			description: faker.lorem.paragraph(),
			author: faker.name.findName(),
			publicationDate: faker.date.between(new Date('1870-01-01'), new Date()),
			coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
			tags: getTags(),
		})
	}
	return data
}
