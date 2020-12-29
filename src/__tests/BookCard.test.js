import { render, screen, configure } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BookCard } from 'Components'

configure({ testIdAttribute: 'data-test' })

const mockBook = {
	id: 5,
	title: 'Reactive leading edge structure',
	description:
		'Ipsam nostrum dolorem ut est vel rerum nesciunt. Doloremque deleniti non impedit non. Qui ipsum non voluptatem voluptas nihil et qui. Commodi esse facilis et voluptate. Perferendis error illo molestias ducimus magni impedit corrupti fugiat. Velit ullam ipsa quasi eum.',
	author: 'Juanita Ullrich',
	publicationDate: '1919-04-17T15:59:42.529Z',
	coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
	tags: ['HORROR', 'FICTION'],
}

describe('<BookCard />', () => {
	render(
		<MemoryRouter>
			<BookCard book={mockBook} />
		</MemoryRouter>
	)
	const title = screen.getByText('Reactive leading edge structure')
	const author = screen.getByText('Juanita Ullrich')
	const cover = screen.getByAltText(
		'Cover image for "Reactive leading edge structure"'
	)
	const publication = screen.getByText('4/17/1919')

	it('renders the correct elements', () => {
		expect(title).toBeInTheDocument()
		expect(author).toBeInTheDocument()
		expect(cover).toBeInTheDocument()
		expect(publication).toBeInTheDocument()
	})
})
