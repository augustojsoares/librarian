import React from 'react'
import PropTypes from 'prop-types'

import 'Styles/ImageInput.sass'

/**
 * A wrapper on a native image (file) input to uniformize the change handler parameters with
 * the ones from the Input component from hsds-react
 */
const ImageInput = ({ onChange, required = false, id = 'image-input' }) => {
	const handleOnChange = e => {
		const [file] = e.target.files
		onChange(file)
	}

	return (
		<input
			id={id}
			type="file"
			className="image-input"
			data-test="test-image-input"
			accept="image/*"
			onChange={handleOnChange}
			required={required}
		/>
	)
}

ImageInput.propTypes = {
	/** Input's onChange callback */
	onChange: PropTypes.func.isRequired,
	/** Whether the field is required */
	required: PropTypes.bool,
	/** Input's id */
	id: PropTypes.string,
}

export default ImageInput
