import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { Image, Animate } from '@helpscout/hsds-react'

import 'Styles/PageHeader.sass'

const PageHeader = ({ isMinimized }) => {
	return (
		<header className={`page-header ${isMinimized ? 'minimized' : ''}`}>
			<hgroup>
				<div className="title-logo-block">
					<Animate sequence="fade down" delay="800" duration="1000">
						<NavLink to="/books">
							<Image
								className="logo"
								src="https://res.cloudinary.com/dw3fq5hag/image/upload/v1609175123/librarian_qjphny.png"
								alt="Librarian logo"
								loading="lazy"
							/>
						</NavLink>
					</Animate>
					<Animate sequence="fade up" delay="1000" duration="1000">
						<NavLink to="/books">
							<h1 className="title">LIBRARIAN</h1>
						</NavLink>
					</Animate>
				</div>
				<Animate sequence="fade" delay="2500" duration="1000">
					<h2 className="subtitle">Your online book keeper</h2>
				</Animate>
			</hgroup>
		</header>
	)
}

PageHeader.propTypes = {
	isMinimized: PropTypes.bool.isRequired,
}

export default PageHeader
