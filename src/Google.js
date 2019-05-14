const querystring = require('querystring')
const axios = require('axios')

class Google {

	static getAuthorizationUrl(clientId, redirectUri, scope, offline = false, state = undefined, includeGrantedScopes = false, loginHint = undefined, prompt = undefined) {
		let url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${querystring.escape(clientId)}&redirect_uri=${querystring.escape(redirectUri)}&scope=${querystring.escape(scope)}&response_type=code`
		if (offline) {
			url += '&access_type=offline'
		}
		if (state) {
			url += `&state=${querystring.escape(state)}`
		}
		if (includeGrantedScopes) {
			url += '&include_granted_scopes=true'
		}
		if (loginHint) {
			url += `&login_hint=${querystring.escape(loginHint)}`
		}
		if (prompt) {
			url += `&prompt=${querystring.escape(prompt)}`
		}

		return url
	}

	static exchangeCode(code, clientId, clientSecret, redirectUri) {
		const url = `https://www.googleapis.com/oauth2/v4/token?code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`

		return axios.post(url).then(response => response.data)
	}

	static getUserInfo(accessToken) {
		return axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
			headers: { 'Authorization': `Bearer ${accessToken}` }
		}).then(response => response.data)
	}

}

module.exports = Google
