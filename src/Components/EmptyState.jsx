import React from 'react'
import PropTypes from 'prop-types'
import { BlankSlate, Illo } from '@helpscout/hsds-react'

const EmptyState = ({
	title = 'No books to be found',
	message = 'No books were found. Please add some new books or change your search parameters.',
}) => {
	return (
		<BlankSlate
			lightBackground={false}
			alignTop={false}
			message={message}
			title={title}
			illo={<Illo name="spot-misc-empty" />}
		/>
	)
}

EmptyState.propTypes = {
	/** Title to display */
	title: PropTypes.string,
	/** Message to display */
	message: PropTypes.string,
}

export default EmptyState
