import parse from 'parse-link-header'

const API_ENDPOINT = 'http://localhost:3001'
const CLOUDINARY_UPLOAD_URL =
	'https://api.cloudinary.com/v1_1/dw3fq5hag/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'hso6d8bm'

const PAGE_RANGE = 25

/**
 * Wrapper method to extract json from fetch responses
 * @param {response} res The request response
 * @returns {json} The response's json payload
 */
const parseResponseJSON = res => res.json()

/**
 * Extracts json from response and parses Link header to extract pagination info
 * @param {response} res The request response
 * @returns {object} An object containing the response promise and the parsed pagination info
 */
const enrichedResponseParser = res => {
	if (res.headers.get('link')) {
		return {
			...parse(res.headers.get('link')),
			dataPromise: res.json(),
		}
	}
	return {
		dataPromise: res.json(),
		last: {
			_page: 1,
		},
	}
}

/**
 * Request configuration builder
 * @param {object} config The specific config parameters for this request
 * @returns {object} The generated config object.
 */
const getConfig = ({ method, data }) => ({
	method,
	mode: 'cors',
	cache: 'no-cache',
	credentials: 'same-origin',
	body: JSON.stringify(data),
	headers: {
		'Content-Type': 'application/json',
	},
})

/**
 * This wrapper on the requests makes it easy to change request config or change rest providers
 *  without changing the specific resource object methods
 */
const requests = {
	get: ({ url, responseParser = parseResponseJSON }) =>
		fetch(`${API_ENDPOINT}${url}`, getConfig({ method: 'GET' })).then(
			responseParser
		),
	post: ({ url, data, responseParser = parseResponseJSON }) =>
		fetch(`${API_ENDPOINT}${url}`, getConfig({ method: 'POST', data })).then(
			responseParser
		),
	patch: ({ url, data, responseParser = parseResponseJSON }) =>
		fetch(`${API_ENDPOINT}${url}`, getConfig({ method: 'PATCH', data })).then(
			responseParser
		),
	delete: ({ url, responseParser = parseResponseJSON }) =>
		fetch(`${API_ENDPOINT}${url}`, getConfig({ method: 'DELETE' })).then(
			responseParser
		),
}

/**
 * a resource object containing all methods required for that resource (abstracted through the requests wrapper)
 * each resource type warrants its own object
 */
const Books = {
	get: bookId => requests.get({ url: `/books/${bookId}` }),
	getAll: (filter = '') =>
		requests.get({
			url: `/books/?${filter}&_limit=${PAGE_RANGE}`,
			responseParser: enrichedResponseParser,
		}),
	create: data => requests.post({ url: '/books/', data }),
	delete: bookId => requests.delete({ url: `/books/${bookId}` }),
}

const Cloudinary = {
	upload: data => {
		const body = new FormData()
		body.append('file', data)
		body.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
		return fetch(CLOUDINARY_UPLOAD_URL, {
			method: 'POST',
			body: body,
		}).then(parseResponseJSON)
	},
}

export default {
	Books,
	Cloudinary,
	PAGE_RANGE,
}
