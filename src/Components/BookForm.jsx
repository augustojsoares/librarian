import React, { useState, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import {
	Form,
	FormGroup,
	FormLabel,
	Input,
	Animate,
	Alert,
	Button,
	Flexy,
} from '@helpscout/hsds-react'
import { ImageInput, TagSelector, TagList, DateInput, Loader } from 'Components'
import API from 'API'

import 'Styles/BookForm.sass'

const ACTION_BOOK_FORM_SAVING = 'ACTION_BOOK_FORM_SAVING'
const ACTION_BOOK_FORM_SAVING_SUCCESS = 'ACTION_BOOK_FORM_SAVING_SUCCESS'
const ACTION_BOOK_FORM_SAVING_IMAGE_SUCCESS =
	'ACTION_BOOK_FORM_SAVING_IMAGE_SUCCESS'
const ACTION_BOOK_FORM_SAVING_ERROR = 'ACTION_BOOK_FORM_SAVING_ERROR'
const ACTION_BOOK_FORM_CLEAR_ERROR = 'ACTION_BOOK_FORM_CLEAR_ERROR'

/**
 * Reducer function for the useReducer hook.
 * State machine-like, to facilitate keeping dependant state in proper sync
 * @param {object} state The current state value.
 * @param {object} action The action object containing and action type and optionally a data payload
 * @return {number} The new updated state for the useReducer hook
 */
const bookFormReducer = (state, { type }) => {
	switch (type) {
		case ACTION_BOOK_FORM_SAVING:
			return {
				...state,
				isLoading: true,
				loadingMessage: 'Uploading your image...',
				errorMessage: false,
			}
		case ACTION_BOOK_FORM_SAVING_SUCCESS:
			return {
				...state,
				isLoading: false,
			}
		case ACTION_BOOK_FORM_SAVING_IMAGE_SUCCESS:
			return {
				...state,
				isLoading: true,
				loadingMessage: 'Saving your book...',
			}
		case ACTION_BOOK_FORM_SAVING_ERROR:
			return {
				...state,
				isLoading: false,
				errorMessage:
					'There was a problem saving your book. Please try again later.',
			}
		case ACTION_BOOK_FORM_CLEAR_ERROR:
			return {
				...state,
				errorMessage: false,
			}
		default:
			state
	}
}

const BookForm = () => {
	const [tags, setTags] = useState([])
	const [formData, setFormData] = useState({})
	const [customFields, setCustomFields] = useState([])

	const [{ loadingMessage, isLoading, errorMessage }, dispatch] = useReducer(
		bookFormReducer,
		{
			loadingMessage: '',
			isLoading: false,
			errorMessage: false,
		}
	)

	const history = useHistory()

	/**
	 * Handles form submission and all associated async operations required to save book data
	 * @param {object} event The form submission event
	 * @return {void}
	 */
	const handleSaveBook = async e => {
		e.preventDefault()
		dispatch({ type: ACTION_BOOK_FORM_SAVING })

		try {
			const { secure_url: coverImage } = await API.Cloudinary.upload(
				formData.coverImage
			)
			dispatch({ type: ACTION_BOOK_FORM_SAVING_IMAGE_SUCCESS })

			const requestBody = {
				...formData,
				coverImage,
				addedDate: new Date(),
				tags,
			}

			delete requestBody.customFieldName

			const { id } = await API.Books.create(requestBody)

			dispatch({ type: ACTION_BOOK_FORM_SAVING_SUCCESS })

			history.push(`/books/${id}`)
		} catch (error) {
			dispatch({ type: ACTION_BOOK_FORM_SAVING_ERROR })
			/** Cleasr the error message after 6 seconds */
			setTimeout(() => {
				dispatch({ type: ACTION_BOOK_FORM_CLEAR_ERROR })
			}, 6000)
		}
	}

	/**
	 * Creates a new change handler to pass to an input that closes over the input's key
	 * The handler then updates formData's given key with the passed value when called
	 * @param {string} key The current input's key
	 * @return {void}
	 */
	const registerChangeHandler = key => value => {
		setFormData({
			...formData,
			[key]: value,
		})
	}

	/**
	 * Adds a new field to the custom list. Uses the input's controlled value to retrieve the field name/key.
	 * If a field with the same name already exists, does not add
	 * Clears the custom field input
	 * @returns {void}
	 */
	const handleAddCustomFormField = () => {
		const fieldsSet = new Set(customFields)
		fieldsSet.add(formData.customFieldName)

		setCustomFields(Array.from(fieldsSet))
		setFormData({ ...formData, customFieldName: '' })
	}

	/**
	 * Removes a custom field from the list and removes it's value from the formData object
	 * @param {string} name The name of the field to remove
	 * @returns {void}
	 */
	const handleRemoveCustomFormField = name => () => {
		setCustomFields(customFields.filter(field => field !== name))
		setFormData(
			Object.fromEntries(
				Object.entries(formData).filter(([key]) => key !== name)
			)
		)
	}

	/**
	 * Renders the input to add new custom fileds to the form
	 * @returns {void}
	 */
	const renderCustomFieldCreator = () => (
		<FormGroup>
			<FormLabel label="Add extra fields">
				<Input
					value={formData.customFieldName}
					placeholder="Field Name"
					onChange={registerChangeHandler('customFieldName')}
					type="text"
					action={
						<Flexy gap="xs">
							<Flexy.Item>
								<Button
									kind="primary"
									size="sm"
									onClick={handleAddCustomFormField}
								>
									Add
								</Button>
							</Flexy.Item>
						</Flexy>
					}
				/>
			</FormLabel>
		</FormGroup>
	)

	/**
	 * Dynamically renders new custom fields into the form as they are added
	 * @returns {void}
	 */
	const renderCustomFields = () => (
		<>
			{customFields.map(customFieldName => {
				return (
					<FormGroup key={customFieldName}>
						<FormLabel label={customFieldName}>
							<Input
								onChange={registerChangeHandler(customFieldName)}
								value={formData[customFieldName]}
								required
								action={
									<Flexy gap="xs">
										<Flexy.Item>
											<Button
												size="sm"
												onClick={handleRemoveCustomFormField(customFieldName)}
											>
												X
											</Button>
										</Flexy.Item>
									</Flexy>
								}
							/>
						</FormLabel>
					</FormGroup>
				)
			})}
		</>
	)

	return isLoading ? (
		<Loader message={loadingMessage} />
	) : (
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

					{renderCustomFieldCreator()}
					{renderCustomFields()}

					<FormGroup>
						<FormLabel label="Tags">
							<TagSelector
								trigger="Add tags"
								selectedTags={tags}
								setSelectedTags={setTags}
							/>
						</FormLabel>
						<TagList tags={tags} />
					</FormGroup>

					{errorMessage ? (
						<Alert icon status="error" className="alert">
							{errorMessage}
						</Alert>
					) : (
						''
					)}
				</Form>
			</Animate>
		</section>
	)
}

export default BookForm
