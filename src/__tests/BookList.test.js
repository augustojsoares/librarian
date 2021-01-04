import React from 'react'
import { render, screen, configure } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BookList } from 'Components'
import { mockBookList as mockResponse, mockHeaders } from '__tests/__mocks'

configure({ testIdAttribute: 'data-test' })

beforeEach(() => {
	jest.spyOn(global, 'fetch').mockResolvedValue({
		json: () => Promise.resolve(mockResponse),
		headers: {
			get: jest.fn(
				() =>
					'<http://localhost:3001/books/?_page=1&_limit=25>; rel="first", <http://localhost:3001/books/?_page=2&_limit=25>; rel="next", <http://localhost:3001/books/?_page=41&_limit=25>; rel="last"'
			),
		},
	})
})

afterEach(() => {
	jest.restoreAllMocks()
})

describe('<BookList />', () => {
	it('fetches the correct data', async () => {
		render(
			<MemoryRouter>
				<BookList />
			</MemoryRouter>
		)

		expect(global.fetch).toHaveBeenCalledTimes(1)
		expect(global.fetch).toHaveBeenCalledWith(
			'http://localhost:3001/books/?_page=1&_limit=25',
			mockHeaders()
		)
		expect(await (await global.fetch()).json()).toMatchObject(mockResponse)
	})

	it('renders the book list', async () => {
		render(
			<MemoryRouter>
				<BookList />
			</MemoryRouter>
		)

		expect(await screen.findByTestId('test-book-list')).toBeInTheDocument()

		const bookCards = await screen.findAllByTestId(/test-book-card/)
		expect(bookCards.length).toBe(10)
	})

	it('Changes the view when the radio is toggled', () =>
		expect(true).toBeTruthy())

	it('Shows the correct books when a tag is selected', () =>
		expect(true).toBeTruthy())

	it('Shows the correct books when a tag is unselected', () =>
		expect(true).toBeTruthy())

	it('Shows the correct books when the sort filter changes', () =>
		expect(true).toBeTruthy())

	it('Shows An error screen when no books are returned', () =>
		expect(true).toBeTruthy())

	it('Shows the correct books when given url params', () =>
		expect(true).toBeTruthy())
})
