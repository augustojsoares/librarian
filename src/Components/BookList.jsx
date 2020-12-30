import React, { useReducer, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { AnimateGroup, Animate } from '@helpscout/hsds-react'
import { BookCard, Loader, EmptyState, BookListHeader } from 'Components'

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
	const history = useHistory()
	const { pathname, search } = useLocation()
	const pageURLParams = new URLSearchParams(search)

	const [isListView, setIsListView] = useState(
		pageURLParams.get('view') === 'list'
	)
	const [selectedTags, setSelectedTags] = useState(
		pageURLParams.get('tags_like')?.split(',') || []
	)

	const [{ books, loading }, dispatch] = useReducer(bookListReducer, {
		books: [],
		loading: false,
	})

	const refreshPageQueryParameters = () =>
		history.push(`${pathname}?${pageURLParams}`)

	/**
	 * Fetches a book list through the API object and dispatches the proper actions to update the reducer state
	 * @param {string} [filter] The filters to pass with the request
	 * @returns {void}
	 */
	const handleFetchBookData = async (filter = '') => {
		dispatch({ type: ACTION_BOOK_LIST_LOADING })
		const payload = await API.Books.getAll(filter)

		if (filter) {
			const newSearchParams = new URLSearchParams(filter)
			newSearchParams.forEach((value, key) => {
				pageURLParams.set(key, value)
			})
		}
		refreshPageQueryParameters()

		dispatch({ type: ACTION_BOOK_LIST_LOADING_SUCCESS, payload })
	}

	const updateLayout = isList => {
		setIsListView(isList)
		pageURLParams.set('view', isList ? 'list' : 'grid')
		refreshPageQueryParameters()
	}

	useEffect(() => {
		if (selectedTags.length) {
			pageURLParams.set('tags_like', selectedTags.join(','))
		}
		handleFetchBookData(pageURLParams.toString())

		return () => {
			null
		}
	}, [selectedTags])

	return loading ? (
		<Loader />
	) : books.length ? (
		<section className="book-list" data-test="test-book-list">
			<BookListHeader
				fetchBookData={handleFetchBookData}
				updateLayout={updateLayout}
				isListView={isListView}
				updateTagsToFilter={setSelectedTags}
				selectedTags={selectedTags}
			/>
			<AnimateGroup
				className={`book-list-animation-group ${isListView ? 'list' : ''}`}
				stagger
				easing="ease-in"
				duration={150}
				sequence="fade down"
			>
				{books.map(book => (
					<Animate key={book.id}>
						<BookCard book={book} list={isListView} />
					</Animate>
				))}
			</AnimateGroup>
		</section>
	) : (
		<EmptyState />
	)
}

export default BookList
