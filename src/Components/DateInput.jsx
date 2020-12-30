import React from 'react'
import PropTypes from 'prop-types'
import { Datepicker } from '@helpscout/hsds-react'

import 'Styles/DateInput.sass'

/**
 * Since the available Datepicker component does not wrap an HTML input,
 * this wrapper was necessary to leverage native form validation (required)
 * as well as label attribution.
 * Although it serves as a proof of concept, for production use this would further require,
 * at the very least, proper management of focus when validation is triggered
 */
const DateInput = ({
	onChange,
	id = 'date-input',
	required = false,
	value,
}) => {
	return (
		<>
			<Datepicker
				firstDayOfWeek={0}
				onDateChange={({ startDate }) => onChange(startDate)}
			/>
			<input
				className="hidden-date-input"
				id={id}
				required={required}
				value={value}
			/>
		</>
	)
}

DateInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	id: PropTypes.string,
	required: PropTypes.bool,
	value: PropTypes.any.isRequired,
}

export default DateInput
