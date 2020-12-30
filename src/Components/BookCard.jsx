import React from 'react'
import PropTypes from 'prop-types'
import { Card, Image } from '@helpscout/hsds-react'
import { TagList } from 'Components'

import 'Styles/BookCard.sass'

const BookCard = ({
	book: { title, author, coverImage, publicationDate, description, tags },
	list = false,
}) => {
	return (
		<article className={`book-card ${list ? 'list' : ''}`}>
			<Card hover className="card-styling">
				<Image
					src={coverImage}
					className="thumbnail"
					alt={`Cover image for "${title}"`}
					loading="lazy"
				/>
				<div className="content">
					<span className="title" aria-label="title" title={title}>
						{title}
					</span>
					<span className="author" aria-label="author">
						{author}
					</span>
					<span className="description" aria-label="description">
						{description}
					</span>
					<time
						className="publication-date"
						aria-label="publication date"
						dateTime={publicationDate}
					>
						{new Date(publicationDate).toLocaleDateString()}
					</time>
					<span className="tags" aria-label="tags">
						<TagList tags={tags} />
					</span>
				</div>
			</Card>
		</article>
	)
}

BookCard.propTypes = {
	book: PropTypes.object.isRequired,
	list: PropTypes.bool,
}

export default BookCard
