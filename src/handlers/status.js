const config = require('../config')

const Tokens = require('../services/Tokens')
const Users = require('../services/Users')

function registerStatusHandlers(app) {
	app.get('/api/status', (request, response) => {
		if (request.cookies && request.cookies[config.tokens.cookieName]) {
			Tokens.getId(request.cookies[config.tokens.cookieName], config.tokens.secret)
				.then((id) => {
					return Users.getUserById(id)
				})
				.then((row) => {
					response.json({
						user: {
							id: row.id,
							email: row.email,
							activeStep: row.activeStep
						}
					})
				})
				.catch(() => {
					response.json({ user: null })
				})
		}
		else {
			response.json({ user: null })
		}
	})
}

module.exports = registerStatusHandlers
