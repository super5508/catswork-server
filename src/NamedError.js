
const NamedError = {
	FORBIDDEN: new Error('Forbidden'),
	INTERNAL_ERROR: new Error('Internal error'),
	CONNECTION_NO_RESULT: new Error('No result')
}

module.exports = NamedError
