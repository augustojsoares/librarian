import React, { useReducer, useEffect } from 'react'
import { AnimateGroup, Animate } from '@helpscout/hsds-react'
import { BookCard, Loader, EmptyState } from 'Components'

import API from 'API'

import 'Styles/BookList.sass'

const ACTION_BOOK_LIST_LOADING = 'ACTION_BOOK_LIST_LOADING'
const ACTION_BOOK_LIST_LOADING_SUCCESS = 'ACTION_BOOK_LIST_LOADING_SUCCESS'

/**
 * Reducer function for the useReducer hook.
 * State machine-like, to facilitate keeping dependant state in proper sync
 * @param {object} state The current state value.
 * @param {object} action The action object containing and action type and optionally a data payload
 * @returns {number} The new updated state for the useReducer hook
 */
const bookListReducer = (state, { type, payload }) => {
	switch (type) {
		case ACTION_BOOK_LIST_LOADING:
			return {
				...state,
				loading: true,
			}
		case ACTION_BOOK_LIST_LOADING_SUCCESS:
			return {
				...state,
				loading: false,
				books: payload,
			}
		default:
			state
	}
}

const BookList = () => {
	const [{ books, loading }, dispatch] = useReducer(bookListReducer, {
		books: [],
		loading: false,
	})

	/**
	 * Fetches a book list through the API object and dispatches the proper actions to update the reducer state
	 * @param {string} [filter] The filters to pass with the request
	 * @returns {void}
	 */
	const handleFetchBookData = async (filter = '') => {
		dispatch({ type: ACTION_BOOK_LIST_LOADING })
		const payload = await API.Books.getAll(filter)
		dispatch({ type: ACTION_BOOK_LIST_LOADING_SUCCESS, payload })
	}

	useEffect(() => {
		handleFetchBookData()

		return () => {
			null
		}
	}, []) //fetches book data on page load

	const BookListUI = () => (
		<section className="book-list" data-test="test-book-list">
			<AnimateGroup
				className="book-list-animation-group"
				stagger
				easing="ease-in"
				duration={150}
				sequence="fade down"
			>
				{books.map(book => (
					<Animate key={book.id}>
						<BookCard book={book} />
					</Animate>
				))}
			</AnimateGroup>
		</section>
	)

	return loading ? <Loader /> : books.length ? <BookListUI /> : <EmptyState />
}

export default BookList
