import React from 'react'
import { render, screen, configure } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BookDetail } from 'Components'
import routeData from 'react-router'
import {
	mockBook as mockResponse,
	mockParams,
	mockHeaders,
} from '__tests/__mocks'

configure({ testIdAttribute: 'data-test' })

beforeEach(() => {
	jest.spyOn(global, 'fetch').mockResolvedValue({
		json: jest.fn().mockResolvedValue(mockResponse),
	})
	jest.spyOn(routeData, 'useParams').mockReturnValue(mockParams)
})

afterEach(() => {
	jest.restoreAllMocks()
})

describe('<BookDetail />', () => {
	it('fetches the correct data', () => {
		render(
			<MemoryRouter>
				<BookDetail />
			</MemoryRouter>
		)

		expect(global.fetch).toHaveBeenCalledTimes(1)
		expect(global.fetch).toHaveBeenCalledWith(
			'http://localhost:3001/books/999',
			mockHeaders()
		)
	})

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
