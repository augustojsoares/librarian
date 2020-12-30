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

const TagSelector = ({ trigger = 'Filter by tag', tags, setTags }) => {
	/**
	 * Updated selected tag list. Add if not present, otherwise remove from list
	 * @param {string} newTag The tag that was selected from the dropdown
	 * @returns {string[]} The updated list of tags
	 */
	const handleTagSelection = newTag => {
		const updatedTagsList = tags.includes(newTag)
			? tags.filter(tag => tag !== newTag)
			: [...tags, newTag]

		setTags(updatedTagsList)
	}

	return (
		<Dropdown
			selectedItem={tags}
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
	trigger: PropTypes.string,
	tags: PropTypes.array.isRequired,
	setTags: PropTypes.func.isRequired,
}

export default TagSelector
