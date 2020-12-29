import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Card, Image } from '@helpscout/hsds-react'

import 'Styles/BookCard.sass'

const BookCard = ({
	book: { id, title, author, coverImage, publicationDate },
}) => {
	return (
		<article className="book-card" data-test="test-book-card">
			<Card hover className="card-styling">
				<NavLink className="link" to={`/books/${id}`}>
					<Image
						src={coverImage}
						className="thumbnail"
						alt={`Cover image for "${title}"`}
					/>
					<div className="content">
						<span className="title" aria-label="title" title={title}>
							{title}
						</span>
						<span className="author" aria-label="author">
							{author}
						</span>
						<time
							className="publication-date"
							aria-label="publication date"
							dateTime={publicationDate}
						>
							{new Date(publicationDate).toLocaleDateString()}
						</time>
					</div>
				</NavLink>
			</Card>
		</article>
	)
}

BookCard.propTypes = {
	book: PropTypes.object.isRequired,
}

export default BookCard
