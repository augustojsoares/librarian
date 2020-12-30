import React, { useEffect, useState } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import { BookList, BookDetail, BookForm, PageHeader } from 'Components'

import 'Styles/App.sass'

function App() {
	const [isMinimized, setIsMinimized] = useState(false)
	const handleScroll = () => {
		console.log(document.documentElement.scrollTop)
		setIsMinimized(
			document.body.scrollTop > 0 || document.documentElement.scrollTop > 0
		)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])
	return (
		<>
			<Router>
				<PageHeader isMinimized={isMinimized} />
				<main role="main" className={`app ${isMinimized ? 'minimized' : ''}`}>
					<Switch>
						<Route path="/books/create">
							<BookForm />
						</Route>
						<Route path="/books/:id">
							<BookDetail />
						</Route>
						<Route path="/books">
							<BookList />
						</Route>
						<Redirect from="*" to="/books" />
					</Switch>
				</main>
			</Router>
		</>
	)
}

export default App
