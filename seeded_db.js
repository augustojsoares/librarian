const faker = require('faker')

/**
 * Data generator module. Creates some random book data to test the app
 * @module data/generator
 */
module.exports = () => {
	const data = { books: [] }

	// Create 1000 books
	for (let i = 0; i < 1000; i++) {
		data.books.push({
			id: i,
			title: faker.company.catchPhrase(),
			description: faker.lorem.paragraph(),
			author: faker.name.findName(),
			publicationDate: faker.date.between(new Date('1870-01-01'),new Date()),
			coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
		})
	}
	return data
}
