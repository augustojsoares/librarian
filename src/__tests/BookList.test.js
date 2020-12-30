import React from 'react'
import { render, screen, configure } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BookList } from 'Components'
import { mockBookList as mockResponse, mockHeaders } from '__tests/__mocks'

configure({ testIdAttribute: 'data-test' })

beforeEach(() => {
	jest.spyOn(global, 'fetch').mockResolvedValue({
		json: jest.fn().mockResolvedValue(mockResponse),
	})
})

afterEach(() => {
	jest.restoreAllMocks()
})

describe('<BookList />', () => {
	it('fetches the correct data', () => {
		render(
			<MemoryRouter>
				<BookList />
			</MemoryRouter>
		)

		expect(global.fetch).toHaveBeenCalledTimes(1)
		expect(global.fetch).toHaveBeenCalledWith(
			'http://localhost:3001/books/?&_page=1&_limit=25',
			mockHeaders()
		)
	})
	it('renders the book list', async () => {
		render(
			<MemoryRouter>
				<BookList />
			</MemoryRouter>
		)

		expect(await screen.findByTestId('test-book-list')).toBeInTheDocument()

		const bookCards = await screen.findAllByTestId('test-book-card')
		expect(bookCards.length).toBe(10)
	})
})
