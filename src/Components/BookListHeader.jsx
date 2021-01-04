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
import { TagSelector, TagList } from 'Components'

import 'Styles/BookListHeader.sass'

const sortOptions = [
	{
		name: 'titleAsc',
		label: 'Title ascending',
		value: 'title|asc',
	},
	{
		name: 'titleDesc',
		label: 'Title descending',
		value: 'title|desc',
	},
	{
		name: 'addedDesc',
		label: 'Added newest',
		value: 'addedDate|desc',
	},
	{
		name: 'addedAsc',
		label: 'Added oldest',
		value: 'addedDate|asc',
	},
	{
		name: 'publicationDesc',
		label: 'Published newest',
		value: 'publicationDate|desc',
	},
	{
		name: 'publicationAsc',
		label: 'Published oldest',
		value: 'publicationDate|asc',
	},
]

const BookListHeader = ({
	isListLayout,
	tagsToFilter,
	updateLayout,
	updateTagsToFilter,
	updateSortFilter,
}) => {
	const history = useHistory()

	const handleLayoutChange = value => {
		updateLayout(value === 'list')
	}

	const goToCreateBook = () => history.push('/books/create')

	/**
	 * Converts the filter string returned from the select to a compatible object and calls the parents update function on it
	 * @param {string} newFilter
	 */
	const handleFilterSelect = newFilter => {
		const [_sort, _order] = newFilter.split('|')
		updateSortFilter({ _sort, _order })
	}

	/**
	 * @todo evolve filter selector to display currently selected sorting option
	 */
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
					onSelect={handleFilterSelect}
					isFocusSelectedItemOnOpen
				/>
				<TagSelector
					trigger="Filter By Tag"
					selectedTags={tagsToFilter}
					setSelectedTags={updateTagsToFilter}
				/>
				<TagList tags={tagsToFilter} />
				<ChoiceGroup
					multiSelect={false}
					className="layout-menu"
					onChange={handleLayoutChange}
					value={isListLayout ? 'list' : 'grid'}
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
	/** Whether the layout type is list (or by oposition, grid) */
	isListLayout: PropTypes.bool.isRequired,
	/** The list of currently selected tags */
	tagsToFilter: PropTypes.array.isRequired,
	/** Callback to update the layout type on the parent */
	updateLayout: PropTypes.func.isRequired,
	/** Callback to update the tag list on the parent */
	updateTagsToFilter: PropTypes.func.isRequired,
	/** Callback to update sort filter on the parent */
	updateSortFilter: PropTypes.func.isRequired,
}

export default BookListHeader
