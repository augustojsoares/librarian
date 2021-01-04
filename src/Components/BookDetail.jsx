import React, { useEffect, useReducer } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Animate, Image, Button, Modal } from '@helpscout/hsds-react'
import { EmptyState, Loader, TagList } from 'Components'
import API from 'API'

import 'Styles/BookDetail.sass'

const ACTION_BOOK_DETAIL_LOADING = 'ACTION_BOOK_DETAIL_LOADING'
const ACTION_BOOK_DETAIL_LOADING_SUCCESS = 'ACTION_BOOK_DETAIL_LOADING_SUCCESS'
const ACTION_BOOK_DETAIL_LOADING_ERROR = 'ACTION_BOOK_DETAIL_LOADING_ERROR'
const ACTION_BOOK_DETAIL_CLICK_DELETE = 'ACTION_BOOK_DETAIL_CLICK_DELETE'
const ACTION_BOOK_DETAIL_CANCEL_DELETE = 'ACTION_BOOK_DETAIL_CANCEL_DELETE'
const ACTION_BOOK_DETAIL_DO_DELETE = 'ACTION_BOOK_DETAIL_DO_DELETE'
const ACTION_BOOK_DETAIL_DO_DELETE_SUCCESS =
	'ACTION_BOOK_DETAIL_DO_DELETE_SUCCESS'
const ACTION_BOOK_DETAIL_DO_DELETE_ERROR = 'ACTION_BOOK_DETAIL_DO_DELETE_ERROR'

/**
 * Reducer function for the useReducer hook.
 * State machine-like, to facilitate keeping dependant state in proper sync
 * @param {object} state The current state value.
 * @param {object} action The action object containing and action type and optionally a data payload
 * @return {number} The new updated state for the useReducer hook
 */
const bookDetailReducer = (state, { type, payload }) => {
	switch (type) {
		case ACTION_BOOK_DETAIL_LOADING:
			return {
				...state,
				isLoading: true,
			}
		case ACTION_BOOK_DETAIL_LOADING_SUCCESS:
			return {
				...state,
				isLoading: false,
				bookDetailData: payload,
				errorMessage: undefined,
			}
		case ACTION_BOOK_DETAIL_LOADING_ERROR:
			return {
				...state,
				isLoading: false,
				bookDetailData: { tags: [] },
				errorMessage:
					'There was an error retrieving your book. Please try again later',
			}
		case ACTION_BOOK_DETAIL_CLICK_DELETE:
			return {
				...state,
				isModalVisible: true,
			}
		case ACTION_BOOK_DETAIL_CANCEL_DELETE:
			return {
				...state,
				isModalVisible: false,
			}
		case ACTION_BOOK_DETAIL_DO_DELETE:
			return {
				...state,
				isLoading: true,
			}
		case ACTION_BOOK_DETAIL_DO_DELETE_SUCCESS:
			return {
				...state,
				isLoading: false,
				isModalVisible: false,
			}
		case ACTION_BOOK_DETAIL_DO_DELETE_ERROR:
			return {
				...state,
				isLoading: false,
				isModalVisible: true,
				errorMessage:
					'There was an error deleting your book. Please try again later',
			}
		default:
			state
	}
}

/** @TODO take book data as prop and optimistically render UI on load and then reconcile data after fetch */
const BookDetail = () => {
	const { id } = useParams()
	const history = useHistory()

	const [
		{ bookDetailData, isLoading, isModalVisible, errorMessage },
		dispatch,
	] = useReducer(bookDetailReducer, {
		bookDetailData: { tags: [] },
		isLoading: false,
		isModalVisible: false,
		errorMessage: null,
	})

	/** Effect to fetch book data on page laod */
	useEffect(async () => {
		dispatch({ type: ACTION_BOOK_DETAIL_LOADING })

		try {
			const payload = await API.Books.get(id)
			dispatch({ type: ACTION_BOOK_DETAIL_LOADING_SUCCESS, payload })
		} catch (error) {
			dispatch({ type: ACTION_BOOK_DETAIL_LOADING_ERROR })
		}

		return () => {
			null
		}
	}, [])

	const handleClickDelete = () =>
		dispatch({ type: ACTION_BOOK_DETAIL_CLICK_DELETE })
	const handleCancelDelete = () =>
		dispatch({ type: ACTION_BOOK_DETAIL_CANCEL_DELETE })

	/**
	 * Deletes a book from the db and dispatches actions to keep state in sync
	 * @return {void}
	 */
	const handleDeleteBook = async () => {
		dispatch({ type: ACTION_BOOK_DETAIL_DO_DELETE })
		try {
			const payload = await API.Books.delete(id)
			dispatch({ type: ACTION_BOOK_DETAIL_DO_DELETE_SUCCESS, payload })
			history.push('/books/')
		} catch (error) {
			dispatch({ type: ACTION_BOOK_DETAIL_DO_DELETE_ERROR })
		}
	}

	const BookInfo = () => {
		const {
			title,
			author,
			description,
			publicationDate,
			tags,
			coverImage,
			/** keeps these props out of customFields and don't need to filter it afterward */
			addedDate, // eslint-disable-line no-unused-vars
			id, // eslint-disable-line no-unused-vars
			...customFields
		} = bookDetailData
		return (
			<>
				<Image
					className="book-detail-cover"
					src={coverImage}
					alt={`Cover image for ${title}`}
				/>
				<div className="book-detail-info">
					<h3 className="title">{title}</h3>
					<h4 className="item">Author</h4>
					<span className="author item">{author}</span>
					<h4 className="item">Description</h4>
					<p className="description item">{description}</p>
					<h4 className="item">Published</h4>
					<time
						className="publication-date item"
						aria-label="publication date"
						dateTime={publicationDate}
					>
						{new Date(publicationDate).toLocaleDateString()}
					</time>
					{/** render all the custom fields */}
					{Object.entries(customFields).map(([key, value]) => (
						<React.Fragment key={key}>
							<h4 className="item">{key}</h4>
							<p className="description item">{value}</p>
						</React.Fragment>
					))}
					<TagList tags={tags} />
					<span className="delete-container">
						<Button
							kind="primary"
							state="danger"
							size="xl"
							onClick={handleClickDelete}
						>
							Delete
						</Button>
					</span>
				</div>
			</>
		)
	}

	const DeleteModal = () => (
		<Modal kind="alert" isOpen={isModalVisible} title="Delete Book" version={2}>
			<Modal.Body version={2}>
				{errorMessage ? (
					<EmptyState message={errorMessage} />
				) : (
					<p>
						This action will result in the irrevocable loss of your book data.
						Are you sure you wish to continue?
					</p>
				)}
			</Modal.Body>
			<Modal.ActionFooter
				primaryButtonText="Delete"
				state="danger"
				onPrimaryClick={handleDeleteBook}
				onCancel={handleCancelDelete}
			/>
		</Modal>
	)
	const BookDetailUI = () => (
		<>
			<Animate sequence="fade down" duration="1000">
				<section className="book-detail" data-test="test-book-detail">
					<BookInfo />
				</section>
			</Animate>
			<DeleteModal />
		</>
	)

	return isLoading ? (
		<Loader />
	) : bookDetailData.id !== undefined ? (
		<BookDetailUI />
	) : (
		<EmptyState message={errorMessage} />
	)
}

export default BookDetail
