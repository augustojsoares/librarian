import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import {
	Dropdown,
	VisuallyHidden,
	Icon,
	ChoiceGroup,
	Radio,
	Button,
} from '@helpscout/hsds-react'
import { TagSelector } from 'Components'

import 'Styles/BookListHeader.sass'

const sortOptions = [
	{
		name: 'titleAsc',
		label: 'Title Ascending',
		value: '_sort=title&_order=asc',
	},
	{
		name: 'titleDesc',
		label: 'Title descending',
		value: '_sort=title&_order=desc',
	},
	{
		name: 'addedDesc',
		label: 'Added newest',
		value: '_sort=addedDate&_order=desc',
	},
	{
		name: 'addedAsc',
		label: 'Added oldest',
		value: '_sort=addedDate&_order=asc',
	},
	{
		name: 'publicationDesc',
		label: 'Published newest',
		value: '_sort=publicationDate&_order=desc',
	},
	{
		name: 'publicationAsc',
		label: 'Published oldest',
		value: '_sort=publicationDate&_order=asc',
	},
]

const BookListHeader = ({
	fetchBookData,
	updateLayout,
	isListView,
	updateTagsToFilter,
	selectedTags,
}) => {
	const history = useHistory()

	const handleSortingChange = newSortingFilter => {
		fetchBookData(newSortingFilter)
	}

	const handleLayoutChange = value => {
		updateLayout(value === 'list')
	}

	const goToCreateBook = () => history.push('/books/create')

	return (
		<header className="book-list-header">
			<span className="filter-group">
				<VisuallyHidden>
					<h2>Book filter controls</h2>
				</VisuallyHidden>
				<Dropdown
					className="sort-menu"
					trigger="Sort by"
					items={sortOptions}
					onSelect={handleSortingChange}
					isFocusSelectedItemOnOpen
				/>
				<TagSelector
					trigger="Filter By Tag"
					tags={selectedTags}
					setTags={updateTagsToFilter}
				/>
				<ChoiceGroup
					multiSelect={false}
					className="layout-menu"
					onChange={handleLayoutChange}
					value={isListView ? 'list' : 'grid'}
				>
					<span className="selection-group">
						<Radio label="Grid" value="grid" name="grid" />
						<Icon name="table" size="32" />
					</span>
					<span className="selection-group">
						<Radio label="List" value="list" name="list" />
						<Icon name="fields" size="32" />
					</span>
				</ChoiceGroup>
			</span>
			<Button kind="primary" onClick={goToCreateBook}>
				Create Book
			</Button>
		</header>
	)
}

BookListHeader.propTypes = {
	fetchBookData: PropTypes.func.isRequired,
	updateLayout: PropTypes.func.isRequired,
	isListView: PropTypes.bool.isRequired,
	updateTagsToFilter: PropTypes.func.isRequired,
	selectedTags: PropTypes.array.isRequired,
}

export default BookListHeader
