import React from 'react'
import { BlankSlate, Illo } from '@helpscout/hsds-react'

const EmptyState = () => {
	return (
		<BlankSlate
			lightBackground={false}
			alignTop={false}
			message={
				'No books were found. Please add some new books or change your search parameters.'
			}
			title={'No books to be found'}
			illo={<Illo name="spot-misc-empty" />}
		/>
	)
}

export default EmptyState
