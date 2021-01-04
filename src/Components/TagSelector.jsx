import React from 'react'
import PropTypes from 'prop-types'

import { Dropdown } from '@helpscout/hsds-react'

const tagOptions = [
	{
		name: 'FICTION',
		title: 'FICTION',
		value: 'FICTION',
	},
	{
		name: 'MISTERY',
		title: 'MISTERY',
		value: 'MISTERY',
	},
	{
		name: 'DRAMA',
		title: 'DRAMA',
		value: 'DRAMA',
	},
	{
		name: 'SCI-FI',
		title: 'SCI-FI',
		value: 'SCI-FI',
	},
	{
		name: 'FANTASY',
		title: 'FANTASY',
		value: 'FANTASY',
	},
	{
		name: 'ADVENTURE',
		title: 'ADVENTURE',
		value: 'ADVENTURE',
	},
	{
		name: 'TECHNICAL',
		title: 'TECHNICAL',
		value: 'TECHNICAL',
	},
	{
		name: 'ROMANCE',
		title: 'ROMANCE',
		value: 'ROMANCE',
	},
	{
		name: 'HORROR',
		title: 'HORROR',
		value: 'HORROR',
	},
	{
		name: 'SHORT',
		title: 'SHORT',
		value: 'SHORT',
	},
	{
		name: 'COOKING',
		title: 'COOKING',
		value: 'COOKING',
	},
]

const TagSelector = ({
	trigger = 'Filter by tag',
	selectedTags,
	setSelectedTags,
}) => {
	/**
	 * Updated selected tag list. Add if not present, otherwise remove from list
	 * @param {string} newTag The tag that was selected from the dropdown
	 * @return {string[]} The updated list of tags
	 */
	const handleTagSelection = newTag => {
		const updatedTagsList = selectedTags.includes(newTag)
			? selectedTags.filter(tag => tag !== newTag)
			: [...selectedTags, newTag]

		setSelectedTags(updatedTagsList)
	}

	return (
		<Dropdown
			selectedItem={selectedTags}
			allowMultipleSelection
			className="sort-menu"
			trigger={trigger}
			items={tagOptions}
			onSelect={handleTagSelection}
			isFocusSelectedItemOnOpen
		/>
	)
}

TagSelector.propTypes = {
	/** Text to display on the dropdown button */
	trigger: PropTypes.string,
	/** list of currently selected tags */
	selectedTags: PropTypes.array.isRequired,
	/** Callback to update list of selected tags */
	setSelectedTags: PropTypes.func.isRequired,
}

export default TagSelector
