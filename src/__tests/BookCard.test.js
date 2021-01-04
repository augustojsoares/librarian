import React from 'react'
import { render, screen, configure } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BookCard } from 'Components'
import { mockBook } from '__tests/__mocks'

configure({ testIdAttribute: 'data-test' })

describe('<BookCard />', () => {
	it('renders the correct elements', () => {
		render(
			<MemoryRouter>
				<BookCard book={mockBook} />
			</MemoryRouter>
		)
		const title = screen.getByText(mockBook.title)
		const author = screen.getByText(mockBook.author)
		const cover = screen.getByAltText(`Cover image for "${mockBook.title}"`)
		const publication = screen.getByText(
			new Date(mockBook.publicationDate).toLocaleDateString()
		)

		expect(title).toBeInTheDocument()
		expect(author).toBeInTheDocument()
		expect(cover).toBeInTheDocument()
		expect(publication).toBeInTheDocument()
	})

	it('renders the correct elements for list layout', () => {
		render(
			<MemoryRouter>
				<BookCard book={mockBook} list />
			</MemoryRouter>
		)
		const title = screen.getByText(mockBook.title)
		const author = screen.getByText(mockBook.author)
		const cover = screen.getByAltText(`Cover image for "${mockBook.title}"`)
		const publication = screen.getByText(
			new Date(mockBook.publicationDate).toLocaleDateString()
		)
		const description = screen.getByText(mockBook.description)
		const tag1 = screen.getByText(mockBook.tags[0])
		const tag2 = screen.getByText(mockBook.tags[0])

		expect(title).toBeInTheDocument()
		expect(author).toBeInTheDocument()
		expect(cover).toBeInTheDocument()
		expect(publication).toBeInTheDocument()
		expect(description).toBeInTheDocument()
		expect(tag1).toBeInTheDocument()
		expect(tag2).toBeInTheDocument()
	})
})
