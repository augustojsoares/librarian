export const mockParams = {
	id: 999,
}

export const mockBook = {
	id: 9,
	title: 'Polarised foreground approach',
	description:
		'Aut dolor consequatur ad dolorum odio. Est et non dolorum et id sequi. Autem officia sunt sunt.',
	author: 'Iris McLaughlin',
	publicationDate: '1898-04-10T21:10:54.327Z',
	coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
	tags: ['ADVENTURE', 'SHORT'],
}

export const mockBookList = [
	{
		id: 0,
		title: 'Managed uniform Graphical User Interface',
		description:
			'Maxime voluptatem optio sit cumque sit est. Ea incidunt officia delectus repudiandae corporis est pariatur eligendi expedita. Dolorum quia minima id minima dolorum. Velit nisi quia aperiam reiciendis.',
		author: 'Zachary Orn',
		publicationDate: '1888-11-12T08:28:28.119Z',
		coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
		tags: [],
	},
	{
		id: 1,
		title: 'Networked needs-based success',
		description:
			'Illo optio facere ex quo. Veniam dolore distinctio harum quia quia. Inventore qui et est tempora illo exercitationem qui.',
		author: 'Sammy Schroeder IV',
		publicationDate: '1982-05-01T09:00:29.970Z',
		coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
		tags: ['ADVENTURE', 'DRAMA', 'ROMANCE'],
	},
	{
		id: 2,
		title: 'Expanded context-sensitive archive',
		description:
			'Illo laborum sint laboriosam et sed eaque. Dignissimos nemo vel quo eum quia non velit. Non suscipit optio.',
		author: 'Blanche Waters',
		publicationDate: '1885-07-19T14:11:35.669Z',
		coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
		tags: ['DRAMA', 'TECHNICAL', 'SHORT'],
	},
	{
		id: 3,
		title: 'Enhanced optimizing approach',
		description:
			'Atque reprehenderit quia. A dolorum ratione nesciunt id dignissimos consequatur non mollitia deleniti. Quis molestiae numquam earum.',
		author: 'Gordon Auer DVM',
		publicationDate: '1941-08-20T13:47:57.863Z',
		coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
		tags: ['SCI-FI', 'DRAMA'],
	},
	{
		id: 4,
		title: 'Intuitive solution-oriented internet solution',
		description:
			'Aut quia id ut. Fuga vero tenetur voluptate et. Veniam rerum voluptatem.',
		author: 'Willard Quigley Sr.',
		publicationDate: '1899-05-06T19:49:34.115Z',
		coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
		tags: ['SHORT', 'SCI-FI'],
	},
	{
		id: 5,
		title: 'Reactive leading edge structure',
		description:
			'Ipsam nostrum dolorem ut est vel rerum nesciunt. Doloremque deleniti non impedit non. Qui ipsum non voluptatem voluptas nihil et qui. Commodi esse facilis et voluptate. Perferendis error illo molestias ducimus magni impedit corrupti fugiat. Velit ullam ipsa quasi eum.',
		author: 'Juanita Ullrich',
		publicationDate: '1919-04-17T15:59:42.529Z',
		coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
		tags: ['HORROR', 'FICTION'],
	},
	{
		id: 6,
		title: 'Reduced context-sensitive moratorium',
		description:
			'Modi suscipit quia fugit. Quia dolore repellat nulla dolor necessitatibus. Distinctio maxime qui. Sed voluptatem ut dolor qui quis veritatis iure.',
		author: 'Everett Predovic',
		publicationDate: '1900-12-13T19:17:26.297Z',
		coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
		tags: ['ADVENTURE', 'ROMANCE'],
	},
	{
		id: 7,
		title: 'Pre-emptive high-level Graphical User Interface',
		description:
			'Exercitationem reprehenderit consequatur ut quibusdam veritatis dolores consequatur. Consequatur praesentium odit et reiciendis ex. Enim aut quia.',
		author: 'Tara Heidenreich',
		publicationDate: '1886-09-16T14:17:56.602Z',
		coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
		tags: ['ROMANCE', 'FICTION', 'MISTERY'],
	},
	{
		id: 8,
		title: 'Vision-oriented asynchronous initiative',
		description:
			'Cum error voluptas. Corporis quidem fuga sequi quos ipsam. Nihil id ratione. Quod rem saepe. Inventore et pariatur consectetur aut et eos occaecati est. Sapiente tempora minima eligendi officia velit.',
		author: 'Deanna Friesen',
		publicationDate: '1997-08-05T16:13:58.155Z',
		coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
		tags: ['SHORT', 'DRAMA'],
	},
	{
		id: 9,
		title: 'Polarised foreground approach',
		description:
			'Aut dolor consequatur ad dolorum odio. Est et non dolorum et id sequi. Autem officia sunt sunt.',
		author: 'Iris McLaughlin',
		publicationDate: '1898-04-10T21:10:54.327Z',
		coverImage: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
		tags: ['ADVENTURE', 'SHORT'],
	},
]

export const mockHeaders = (method = 'GET', body) => ({
	body: JSON.stringify(body),
	cache: 'no-cache',
	credentials: 'same-origin',
	headers: { 'Content-Type': 'application/json' },
	method,
	mode: 'cors',
})
