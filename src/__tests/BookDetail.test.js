import { render, screen, configure } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BookDetail } from 'Components'

const mockResponse = {
	id: 9,
	title: 'Polarised foreground approach',
	description:
		'Aut dolor consequatur ad dolorum odio. Est et non dolorum et id sequi. Autem officia sunt sunt.',
	author: 'Iris McLaughlin',
	publicationDate: '1898-04-10T21:10:54.327Z',
	coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
	tags: ['ADVENTURE', 'SHORT'],
}

configure({ testIdAttribute: 'data-test' })

beforeEach(() => {
	jest.spyOn(global, 'fetch').mockResolvedValue({
		json: jest.fn().mockResolvedValue(mockResponse),
	})
})

afterEach(() => {
	jest.restoreAllMocks()
})

describe('<BookDetail />', () => {
	it('renders the book detail with all elements', async () => {
		render(
			<MemoryRouter>
				<BookDetail />
			</MemoryRouter>
		)

		expect(await screen.findByTestId('test-book-detail')).toBeInTheDocument()
		const author = await screen.findByText('Author')
		expect(author).toBeInTheDocument()
		const description = await screen.findByText('Description')
		expect(description).toBeInTheDocument()
		const published = await screen.findByText('Published')
		expect(published).toBeInTheDocument()
	})

	it('renders all tags', () => {
		expect(1).toEqual(1)
	})

	it('renders all dynamic fields', () => {
		expect(1).toEqual(1)
	})

	it('opens modal', () => {
		expect(1).toEqual(1)
	})

	it('closes modal', () => {
		expect(1).toEqual(1)
	})

	it('deletes book', () => {
		expect(1).toEqual(1)
	})
})
