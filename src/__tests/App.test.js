import { render, screen, configure } from '@testing-library/react'
import App from 'App'

describe('App.js', () => {
	it('renders', () => {
		render(<App />)
		const linkElement = screen.getByRole(/main/i)
		expect(linkElement).toBeInTheDocument()
	})
})
