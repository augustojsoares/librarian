import React from 'react'
import { Spinner } from '@helpscout/hsds-react'

import 'Styles/Loader.sass'

const Loader = () => {
	return (
		<div className="loader-container" data-test="loader">
			<Spinner size="xl" />
			<span className="loader-message">Fetching book data. Please wait.</span>
		</div>
	)
}

export default Loader
