import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '@helpscout/hsds-react'

import 'Styles/Loader.sass'

/** Extends the Spinner element with an optional message and some formatting */
const Loader = ({ message = 'Fetching book data. Please wait.' }) => {
	return (
		<div className="loader-container" data-test="loader">
			<Spinner size="xl" />
			<span className="loader-message">{message}</span>
		</div>
	)
}

Loader.propTypes = {
	/** Message tp display */
	message: PropTypes.string,
}

export default Loader
