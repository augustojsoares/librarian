import React from 'react'
import PropTypes from 'prop-types'
import { Datepicker } from '@helpscout/hsds-react'

import 'Styles/DateInput.sass'

/**
 * Since the available Datepicker component does not wrap an HTML input,
 * this wrapper was necessary to leverage native form validation (required field)
 * as well as label attribution (a11y).
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
	/** Input's change callback */
	onChange: PropTypes.func.isRequired,
	/** Input's id */
	id: PropTypes.string,
	/** Whether or not field is required */
	required: PropTypes.bool,
	/** Input's controlled value */
	value: PropTypes.any,
}

export default DateInput
