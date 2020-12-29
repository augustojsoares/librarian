import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import { BookList, BookDetail, BookForm } from 'Components'

import 'Styles/App.sass'

function App() {
	return (
		<>
			<Router>
				<main role="main" className="app">
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
