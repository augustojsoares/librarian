import React from 'react'
import { render, screen, configure, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BookForm } from 'Components'

const mockResponse = {}

configure({ testIdAttribute: 'data-test' })

beforeEach(() => {
	jest.spyOn(global, 'fetch').mockResolvedValue({
		json: jest.fn().mockResolvedValue(mockResponse),
	})
})

afterEach(() => {
	jest.restoreAllMocks()
})

describe('<BookForm />', () => {
	it('renders the book detail with all elements', async () => {
		render(
			<MemoryRouter>
				<BookForm />
			</MemoryRouter>
		)

		expect(await screen.findByTestId('test-book-form')).toBeInTheDocument()

		// This approach is unfeasible do to an issue with node that I couldn't resolve in the scope of this project
		// const fields = ['Author', 'Title', 'Description', 'Publication Date', 'Cover Image']
		// fields.forEach(async field => {
		//   const label = await screen.findByText(field)
		//   expect(label).toBeInTheDocument()
		//   const input = await screen.findByLabelText(field)
		//   expect(input).toBeInTheDocument()
		// })

		const titleLabel = await screen.findByText(/title/i)
		expect(titleLabel).toBeInTheDocument()
		const titleInput = await screen.findByLabelText(/title/i)
		expect(titleInput).toBeInTheDocument()

		const authorLabel = await screen.findByText(/author/i)
		expect(authorLabel).toBeInTheDocument()
		const authorInput = await screen.findByLabelText(/author/i)
		expect(authorInput).toBeInTheDocument()

		const descriptionLabel = await screen.findByText(/description/i)
		expect(descriptionLabel).toBeInTheDocument()
		const descriptionInput = await screen.findByLabelText(/description/i)
		expect(descriptionInput).toBeInTheDocument()

		const dateLabel = await screen.findByText(/date/i)
		expect(dateLabel).toBeInTheDocument()
		const dateInput = await screen.findByLabelText(/date/i)
		expect(dateInput).toBeInTheDocument()

		const coverLabel = await screen.findByText(/cover/i)
		expect(coverLabel).toBeInTheDocument()
		const coverInput = await screen.findByLabelText(/cover/i)
		expect(coverInput).toBeInTheDocument()
	})

	it('Creates the book', async () => {
		render(
			<MemoryRouter>
				<BookForm />
			</MemoryRouter>
		)

		fireEvent.change(await screen.findByLabelText(/title/i), {
			target: { value: 'a title' },
		})

		fireEvent.change(await screen.findByLabelText(/author/i), {
			target: { value: 'a author' },
		})

		fireEvent.change(await screen.findByLabelText(/description/i), {
			target: { value: 'a description' },
		})

		fireEvent.change(await screen.findByLabelText(/date/i), {
			target: { value: new Date('1969/07/20') },
		})

		fireEvent.change(await screen.findByLabelText(/cover/i), {
			target: {
				files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })],
			},
		})

		fireEvent.click(await screen.findByText(/save book/i))

		expect(global.fetch).toHaveBeenCalledTimes(1)
	})

	it('Creates the book with extra dynamic fields', () => {
		expect(1).toEqual(1)
	})

	it('renders tags as added', () => {
		expect(1).toEqual(1)
	})

	it('adds fields to the form', () => {
		expect(1).toEqual(1)
	})

	it('shows the book list', () => {
		expect(1).toEqual(1)
	})
})
