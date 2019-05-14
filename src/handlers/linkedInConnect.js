const config = require('../config')
const auth = require('../auth')
const LinkedIn = require('../LinkedIn')

const Users = require('../services/Users')

const AUTHORIZATION_URL = LinkedIn.getAuthorizationUrl(config.linkedIn.clientId, config.linkedIn.redirectUri, config.linkedIn.scope)

function registerSignInHandlers(app) {
	app.get('/linked-in-connect', auth.middleware(auth.ActiveStep.CONNECT_LINKED_IN), (_, response) => {
		response.redirect(AUTHORIZATION_URL)
	})

	app.get('/linked-in-auth', auth.middleware(auth.ActiveStep.CONNECT_LINKED_IN), (request, response) => {
		if (request.query.error || !request.query.code) {
			response.redirect('/error')
		}
		else {
			LinkedIn.exchangeCode(request.query.code, config.linkedIn.clientId, config.linkedIn.clientSecret, config.linkedIn.redirectUri)
				.then((data) => {
					return Users.updateLinkedInAccessToken(request.user.id, data.access_token)
				})
				.then(() => {
					response.redirect('/')
				})
				.catch(() => {
					response.redirect('/error')
				})
		}
	})
}

module.exports = registerSignInHandlers
