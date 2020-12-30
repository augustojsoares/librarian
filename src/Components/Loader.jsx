import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '@helpscout/hsds-react'

import 'Styles/Loader.sass'

const Loader = ({ message = 'Fetching book data. Please wait.' }) => {
	return (
		<div className="loader-container" data-test="loader">
			<Spinner size="xl" />
			<span className="loader-message">{message}</span>
		</div>
	)
}

Loader.propTypes = {
	message: PropTypes.string,
}

export default Loader
