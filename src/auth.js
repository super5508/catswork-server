const config = require('./config')

const ActiveStep = require('./ActiveStep')
const NamedError = require('./NamedError')

const Tokens = require('./services/Tokens')
const Users = require('./services/Users')

function middleware(activeStep) {
	return function (request, response, next) {
		if (request.cookies && request.cookies[config.tokens.cookieName]) {
			Tokens.getId(request.cookies[config.tokens.cookieName], config.tokens.secret)
				.then((id) => {
					return Users.getUserById(id)
				})
				.then((row) => {
					if (row.activeStep < activeStep) {
						throw NamedError.FORBIDDEN
					}

					request.user = row
					next()
				})
				.catch(() => {
					response.sendStatus(403)
				})
		}
		else {
			response.sendStatus(403)
		}
	}
}

function ensurePrivilege(context, activeStep) {
	if (context.user.activeStep < activeStep) {
		throw NamedError.FORBIDDEN
	}
}

module.exports = { ActiveStep, middleware, ensurePrivilege }
