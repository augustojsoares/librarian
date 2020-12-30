import React, { useState, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import {
	Form,
	FormGroup,
	FormLabel,
	Input,
	Animate,
} from '@helpscout/hsds-react'
import { ImageInput, TagSelector, TagList, DateInput, Loader } from 'Components'
import API from 'API'

import 'Styles/BookForm.sass'

const ACTION_BOOK_FORM_SAVING = 'ACTION_BOOK_FORM_SAVING'
const ACTION_BOOK_FORM_SAVING_SUCCESS = 'ACTION_BOOK_FORM_SAVING_SUCCESS'
const ACTION_BOOK_FORM_SAVING_IMAGE_SUCCESS =
	'ACTION_BOOK_FORM_SAVING_IMAGE_SUCCESS'

/**
 * Reducer function for the useReducer hook.
 * State machine-like, to facilitate keeping dependant state in proper sync
 * @param {object} state The current state value.
 * @param {object} action The action object containing and action type and optionally a data payload
 * @returns {number} The new updated state for the useReducer hook
 */
const bookFormReducer = (state, { type }) => {
	switch (type) {
		case ACTION_BOOK_FORM_SAVING:
			return {
				...state,
				loading: true,
				loadingMessage: 'Uploading your image...',
			}
		case ACTION_BOOK_FORM_SAVING_SUCCESS:
			return {
				...state,
				loading: false,
			}
		case ACTION_BOOK_FORM_SAVING_IMAGE_SUCCESS:
			return {
				...state,
				loading: true,
				loadingMessage: 'Saving your book...',
			}
		default:
			state
	}
}

const BookForm = () => {
	const [tags, setTags] = useState([])
	const [formData, setFormData] = useState({})

	const [{ loadingMessage, loading }, dispatch] = useReducer(bookFormReducer, {
		loadingMessage: '',
		loading: false,
	})

	const history = useHistory()

	/**
	 * Handles form submission and all assocciated async operations required to save book data
	 * @param {object} event The form submission event
	 * @returns {void}
	 */
	const handleSaveBook = async e => {
		e.preventDefault()
		dispatch({ type: ACTION_BOOK_FORM_SAVING })

		console.log(formData)

		const { secure_url: coverImage } = await API.Cloudinary.upload(
			formData.coverImage
		)
		dispatch({ type: ACTION_BOOK_FORM_SAVING_IMAGE_SUCCESS })

		const { id } = await API.Books.create({
			...formData,
			coverImage,
			tags,
		})

		dispatch({ type: ACTION_BOOK_FORM_SAVING_SUCCESS })

		history.push(`/books/${id}`)
	}

	/**
	 * Creates a new change handler to pass to an input that closes over the input's key
	 * The handler then updates formData's given given with the passed value when called
	 * @param {string} key The current input's key
	 * @returns {void}
	 */
	const registerChangeHandler = key => value => {
		setFormData({
			...formData,
			[key]: value,
		})
	}

	const BookFormUI = () => (
		<section className="book-form" data-test="test-book-form">
			<Animate
				sequence="fade down"
				duration="1000"
				className="animation-container"
			>
				<h3>Create Book</h3>
				<Form saveText="Save Book" onSave={handleSaveBook}>
					<FormGroup>
						<FormLabel label="Title">
							<Input
								onChange={registerChangeHandler('title')}
								value={formData.title}
								required
							/>
						</FormLabel>
					</FormGroup>
					<FormGroup>
						<FormLabel label="Author">
							<Input
								onChange={registerChangeHandler('author')}
								value={formData.author}
								required
							/>
						</FormLabel>
					</FormGroup>
					<FormGroup>
						<FormLabel label="Description">
							<Input
								multiline={3}
								resizable
								onChange={registerChangeHandler('description')}
								value={formData.description}
								required
							/>
						</FormLabel>
					</FormGroup>
					<FormGroup>
						<FormLabel label="Publication Date" for="publication-date">
							<DateInput
								id="publication-date"
								onChange={registerChangeHandler('publicationDate')}
								value={formData.publicationDate}
								required
							/>
						</FormLabel>
					</FormGroup>
					<FormGroup>
						<FormLabel label="Cover" for="cover">
							<ImageInput
								id="cover"
								onChange={registerChangeHandler('coverImage')}
								required
							/>
						</FormLabel>
					</FormGroup>
					<FormGroup>
						<FormLabel label="Tags">
							<TagSelector trigger="Add tags" tags={tags} setTags={setTags} />
						</FormLabel>
						<TagList tags={tags} />
					</FormGroup>
				</Form>
			</Animate>
		</section>
	)

	return loading ? <Loader message={loadingMessage} /> : <BookFormUI />
}

export default BookForm
