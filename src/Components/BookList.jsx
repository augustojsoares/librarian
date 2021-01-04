import React, { useReducer, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { AnimateGroup, Animate, Pagination } from '@helpscout/hsds-react'
import { BookCard, Loader, EmptyState, BookListHeader } from 'Components'

import API from 'API'

import 'Styles/BookList.sass'

const ACTION_BOOK_LIST_LOADING = 'ACTION_BOOK_LIST_LOADING'
const ACTION_BOOK_LIST_LOADING_SUCCESS = 'ACTION_BOOK_LIST_LOADING_SUCCESS'
const ACTION_BOOK_LIST_LOADING_ERROR = 'ACTION_BOOK_LIST_LOADING_ERROR'

/**
 * Reducer function for the useReducer hook.
 * State machine-like, to facilitate keeping dependant state in proper sync
 * @param {object} state The current state value.
 * @param {object} action The action object containing and action type and optionally a data payload
 * @return {number} The new updated state for the useReducer hook
 */
const bookListReducer = (state, { type, payload }) => {
	switch (type) {
		case ACTION_BOOK_LIST_LOADING:
			return {
				...state,
				isLoading: true,
			}
		case ACTION_BOOK_LIST_LOADING_SUCCESS:
			return {
				...state,
				isLoading: false,
				books: payload,
				errorMessage: undefined,
			}
		case ACTION_BOOK_LIST_LOADING_ERROR:
			return {
				...state,
				isLoading: false,
				books: [],
				errorMessage:
					'There was an error retrieving your books. Please try again later',
			}
		default:
			state
	}
}

const BookList = () => {
	const history = useHistory()
	const { pathname, search } = useLocation()
	const pageURLParams = new URLSearchParams(search)

	/** Initialize filter variables based on URL query string */
	const [isListView, setIsListView] = useState(
		pageURLParams.get('view') === 'list'
	)
	const [tagsToFilter, setSelectedTags] = useState(
		pageURLParams.get('tags_like')?.split(',') || []
	)
	const [sortFilter, setSortFilter] = useState(
		pageURLParams.get('_sort')
			? {
					_sort: pageURLParams.get('_sort'),
					_order: pageURLParams.get('_order'),
			  } //eslint-disable-line
			: ''
	)
	const [currentPage, setCurrentPage] = useState(
		parseInt(pageURLParams.get('_page')) || 1
	)
	const [pageCount, setPageCount] = useState(1)

	const [{ books, isLoading, errorMessage }, dispatch] = useReducer(
		bookListReducer,
		{
			books: [],
			isLoading: false,
			errorMessage: null,
		}
	)

	/**
	 * Fetches a book list through the API object and dispatches the proper actions to update the reducer state
	 * @param {string} [filter] The filters to pass with the request
	 * @return {void}
	 */
	const handleFetchBookData = async (filter = '') => {
		dispatch({ type: ACTION_BOOK_LIST_LOADING })

		try {
			const {
				dataPromise,
				last: { _page: lastPage },
			} = await API.Books.getAll(filter)

			setPageCount(lastPage)

			dataPromise.then(payload => {
				if (currentPage > lastPage || currentPage < 1) {
					setCurrentPage(1)
					return
				}
				dispatch({ type: ACTION_BOOK_LIST_LOADING_SUCCESS, payload })
			})
		} catch (error) {
			dispatch({ type: ACTION_BOOK_LIST_LOADING_ERROR })
		}
	}

	/**
	 * Builds the query string to use based on all the different configurations
	 * @return {void}
	 */
	const buildFilter = () =>
		/**
		 * Put different filter parts in array, filter out empty parts and join with '&'
		 * This method ensures no dangling ampersands
		 */
		[
			tagsToFilter.length ? `tags_like=${tagsToFilter.join(',')}` : '',
			sortFilter ? `_sort=${sortFilter._sort}&_order=${sortFilter._order}` : '',
			isListView ? `view=list` : '',
			`_page=${currentPage}`,
		]
			.filter(el => el)
			.join('&')

	/**
	 * Effect dependent on sort filter, tags and pagination
	 * Updates query params for linkability and to preserve state on refresh
	 * Also triggers data fetch with new parameters
	 * Responsible for triggering the initial data fetch
	 */
	useEffect(() => {
		const filter = buildFilter()
		handleFetchBookData(filter)
		history.push(`${pathname}?${filter}`)
	}, [sortFilter._sort, sortFilter._order, tagsToFilter, currentPage])

	/**
	 * Effect dependent on view update
	 * Updates query params for linkability and to preserver state on refresh
	 * Does not trigger data fetch
	 */
	useEffect(() => {
		const filter = buildFilter()
		history.push(`${pathname}?${filter}`)
	}, [isListView])

	return (
		<section className="book-list" data-test="test-book-list">
			<BookListHeader
				isListLayout={isListView}
				tagsToFilter={tagsToFilter}
				updateLayout={setIsListView}
				updateTagsToFilter={setSelectedTags}
				updateSortFilter={setSortFilter}
			/>
			{isLoading ? (
				<Loader />
			) : books.length ? (
				<>
					<Pagination
						className="paginator"
						isLoading={isLoading}
						totalItems={pageCount * API.PAGE_RANGE}
						rangePerPage={API.PAGE_RANGE}
						onChange={setCurrentPage}
						activePage={currentPage}
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
				</>
			) : (
				<EmptyState message={errorMessage} />
			)}
		</section>
	)
}

export default BookList
