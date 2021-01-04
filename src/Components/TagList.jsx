import React from 'react'
import PropTypes from 'prop-types'
import { Tag, TagList as TL } from '@helpscout/hsds-react'

import 'Styles/TagList.sass'

const colors = [
	'blue',
	'green',
	'grey',
	'orange',
	'purple',
	'red',
	'yellow',
	'lightBlue',
]

const TagList = ({ tags, ...rest }) => {
	return (
		<TL className="tags" aria-label="tags" showAll {...rest}>
			{tags?.map((tag, index) => (
				<Tag key={tag} filled color={colors[index]} className="tag padded">
					{tag}
				</Tag>
			))}
		</TL>
	)
}

TagList.propTypes = {
	/** The list of tags to show */
	tags: PropTypes.array.isRequired,
}

export default TagList
