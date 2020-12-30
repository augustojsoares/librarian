const API_ENDPOINT = 'http://localhost:3001'
const CLOUDINARY_UPLOAD_URL =
	'https://api.cloudinary.com/v1_1/dw3fq5hag/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'hso6d8bm'

/**
 * Wrapper method to extract json from fetch responses
 * @param {response} res The request response
 * @returns {json} The response's json payload
 */
const responseData = res => res.json()

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
	get: url =>
		fetch(`${API_ENDPOINT}${url}`, getConfig({ method: 'GET' })).then(
			responseData
		),
	post: (url, data) =>
		fetch(`${API_ENDPOINT}${url}`, getConfig({ method: 'POST', data })).then(
			responseData
		),
	patch: (url, data) =>
		fetch(`${API_ENDPOINT}${url}`, getConfig({ method: 'PATCH', data })).then(
			responseData
		),
	delete: url =>
		fetch(`${API_ENDPOINT}${url}`, getConfig({ method: 'DELETE' })).then(
			responseData
		),
}

/**
 * a resource object containing all methods required for that resource (abstracted through the requests wrapper)
 * each resource type warrants its own object
 */
const Books = {
	get: bookId => requests.get(`/books/${bookId}`),
	getAll: (filter = '') =>
		requests.get(`/books/?${filter}&_page=${1}&_limit=25`),
	create: body => requests.post('/books/', body),
	delete: bookId => requests.delete(`/books/${bookId}`),
}

const Cloudinary = {
	upload: data => {
		const body = new FormData()
		body.append('file', data)
		body.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
		return fetch(CLOUDINARY_UPLOAD_URL, {
			method: 'POST',
			body: body,
		}).then(responseData)
	},
}

export default {
	Books,
	Cloudinary,
}
