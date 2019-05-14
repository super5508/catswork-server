const querystring = require('querystring')
const axios = require('axios')

class LinkedIn {

	static getAuthorizationUrl(clientId, redirectUri, scope, state = undefined) {
		let url = `https://www.linkedin.com/oauth/v2/authorization?client_id=${querystring.escape(clientId)}&redirect_uri=${querystring.escape(redirectUri)}&scope=${querystring.escape(scope)}&response_type=code`
		if (state) {
			url += `&state=${querystring.escape(state)}`
		}

		return url
	}

	static exchangeCode(code, clientId, clientSecret, redirectUri) {
		const data = {
			grant_type: 'authorization_code',
			redirect_uri: redirectUri,
			client_id: clientId,
			client_secret: clientSecret,
			code
		}

		return axios.post('https://www.linkedin.com/oauth/v2/accessToken', querystring.stringify(data))
			.then(response => response.data)
	}

}

module.exports = LinkedIn
