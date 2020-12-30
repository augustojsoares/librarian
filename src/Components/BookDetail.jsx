import React, { useEffect, useReducer } from 'react'
// import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { Animate, Image, Button, Modal } from '@helpscout/hsds-react'
import { EmptyState, Loader, TagList } from 'Components'
import API from 'API'

import 'Styles/BookDetail.sass'

const ACTION_BOOK_DETAIL_LOADING = 'ACTION_BOOK_DETAIL_LOADING'
const ACTION_BOOK_DETAIL_LOADING_SUCCESS = 'ACTION_BOOK_DETAIL_LOADING_SUCCESS'
const ACTION_BOOK_DETAIL_CLICK_DELETE = 'ACTION_BOOK_DETAIL_CLICK_DELETE'
const ACTION_BOOK_DETAIL_CANCEL_DELETE = 'ACTION_BOOK_DETAIL_CANCEL_DELETE'
const ACTION_BOOK_DETAIL_DO_DELETE = 'ACTION_BOOK_DETAIL_DO_DELETE'
const ACTION_BOOK_DETAIL_DO_DELETE_SUCCESS =
	'ACTION_BOOK_DETAIL_DO_DELETE_SUCCESS'

const bookDetailReducer = (state, { type, payload }) => {
	switch (type) {
		case ACTION_BOOK_DETAIL_LOADING:
			return {
				...state,
				loading: true,
			}
		case ACTION_BOOK_DETAIL_LOADING_SUCCESS:
			return {
				...state,
				loading: false,
				bookDetailData: payload,
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
				loading: true,
			}
		case ACTION_BOOK_DETAIL_DO_DELETE_SUCCESS:
			return {
				...state,
				loading: false,
				isModalVisible: false,
			}
		default:
			state
	}
}

const BookDetail = () => {
	const { id } = useParams()
	const history = useHistory()

	const [{ bookDetailData, loading, isModalVisible }, dispatch] = useReducer(
		bookDetailReducer,
		{
			bookDetailData: { tags: [] },
			loading: false,
			isModalVisible: false,
		}
	)

	useEffect(async () => {
		dispatch({ type: ACTION_BOOK_DETAIL_LOADING })
		const payload = await API.Books.get(id)
		dispatch({ type: ACTION_BOOK_DETAIL_LOADING_SUCCESS, payload })

		return () => {
			null
		}
	}, [])

	const handleClickDelete = () =>
		dispatch({ type: ACTION_BOOK_DETAIL_CLICK_DELETE })
	const handleCancelDelete = () =>
		dispatch({ type: ACTION_BOOK_DETAIL_CANCEL_DELETE })

	const handleDeleteBook = async () => {
		dispatch({ type: ACTION_BOOK_DETAIL_DO_DELETE })
		const payload = await API.Books.delete(id)
		dispatch({ type: ACTION_BOOK_DETAIL_DO_DELETE_SUCCESS, payload })
		history.push('/books/')
	}

	const BookInfo = () => (
		<div className="book-detail-info">
			<h3 className="title">{bookDetailData.title}</h3>
			<h4 className="item">Author</h4>
			<span className="author item">{bookDetailData.author}</span>
			<h4 className="item">Description</h4>
			<p className="description item">{bookDetailData.description}</p>
			<h4 className="item">Published</h4>
			<time
				className="publication-date item"
				aria-label="publication date"
				dateTime={bookDetailData.publicationDate}
			>
				{new Date(bookDetailData.publicationDate).toLocaleDateString()}
			</time>
			<TagList tags={bookDetailData.tags} />
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
	)

	const DeleteModal = () => (
		<Modal kind="alert" isOpen={isModalVisible} title="Delete Book" version={2}>
			<Modal.Body version={2}>
				<p>
					This action will result in the irrevocable loss of your book data. Are
					you sure you wish to continue?
				</p>
			</Modal.Body>
			<Modal.ActionFooter
				primaryButtonText="Delete"
				state="danger"
				onPrimaryClick={handleDeleteBook}
				onCancel={handleCancelDelete}
			/>
		</Modal>
	)

	return loading ? (
		<Loader />
	) : bookDetailData.id ? (
		<>
			<Animate sequence="fade down" duration="1000">
				<section className="book-detail" data-test="test-book-detail">
					<Image
						className="book-detail-cover"
						src={bookDetailData.coverImage}
						alt={`Cover image for ${bookDetailData.title}`}
					/>
					<BookInfo />
				</section>
			</Animate>
			<DeleteModal />
		</>
	) : (
		<EmptyState />
	)
}

export default BookDetail
