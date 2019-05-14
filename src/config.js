const path = require('path')

const config = {
	port: 7777,
	client: {
		staticRoot: path.join(__dirname, '..', '..', 'catswork-web-client', 'build'),
		htmlPath: path.join(__dirname, '..', '..', 'catswork-web-client', 'index.html')
	},
	database: {
		host: 'localhost',
		user: 'root',
		password: 'xyzzyy',
		database: 'CatsWork'
	},
	google: {
		clientId: '1053854177742-e4vl19j6llb1um1c3587p2g53g12cg9s.apps.googleusercontent.com',
		clientSecret: '4Qsy55wMCS5ldFFE3vu7fw-N',
		redirectUri: 'http://localhost:7777/auth',
		scope: 'email profile'
	},
	linkedIn: {
		clientId: '8686uugq5g7utw',
		clientSecret: 'GecLRFhl6AWWS8j9',
		redirectUri: 'http://localhost:7777/linked-in-auth',
		scope: 'r_emailaddress r_liteprofile r_basicprofile w_member_social'
	},
	tokens: {
		cookieName: 'cats_work_auth',
		secret: 'cdklajfldksjalkfdsalkfjdslkajfldksajl',
		expiresInSeconds: 7 * 24 * 60 * 60
	}
}

module.exports = config
