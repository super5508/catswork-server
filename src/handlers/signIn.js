const config = require('../config')
const Google = require('../Google')
const NamedError = require('../NamedError')

const Users = require('../services/Users')
const Tokens = require('../services/Tokens')

const AUTHORIZATION_URL = Google.getAuthorizationUrl(config.google.clientId, config.google.redirectUri, config.google.scope, true)

function registerSignInHandlers(app) {
	app.get('/dev-sign-in', (_, response) => {
		Tokens.sign(1, config.tokens.secret, config.tokens.expiresInSeconds)
			.then((token) => {
				response.cookie(config.tokens.cookieName, token, { httpOnly: true })
				response.redirect('/')
			})
			.catch(() => {
				response.redirect('/error')
			})
	})

	app.get('/sign-in', (_, response) => {
		response.redirect(AUTHORIZATION_URL)
	})

	app.get('/sign-out', (_, response) => {
		response.clearCookie(config.tokens.cookieName)
		response.redirect('/')
	})

	app.get('/auth', (request, response) => {
		if (request.query.error || !request.query.code) {
			response.redirect('/error')
		}
		else {
			let accessToken, refreshToken, email
			Google.exchangeCode(request.query.code, config.google.clientId, config.google.clientSecret, config.google.redirectUri)
				.then((data) => {
					accessToken = data.access_token
					refreshToken = data.refresh_token

					return Google.getUserInfo(accessToken)
				})
				.then((data) => {
					email = data.email

					return Users.getUserIdByEmail(data.email)
						.then((id) => {
							return Users.updateUserTokens(id, accessToken, refreshToken).then(() => id)
						})
						.catch((error) => {
							if (error === NamedError.CONNECTION_NO_RESULT) {
								return Users.createUser(email, accessToken, refreshToken).then((id) => id)
							}
							else {
								throw error
							}
						})
				})
				.then((id) => {
					return Tokens.sign(id, config.tokens.secret, config.tokens.expiresInSeconds)
				})
				.then((token) => {
					response.cookie(config.tokens.cookieName, token, { httpOnly: true })
					response.redirect('/')
				})
				.catch(() => {
					response.redirect('/error')
				})
		}
	})
}

module.exports = registerSignInHandlers
