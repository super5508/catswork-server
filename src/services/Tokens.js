const jwt = require('jsonwebtoken')

class Tokens {

	static sign(id, secret, expiresInSeconds) {
		return new Promise((resolve, reject) => {
			jwt.sign({ id }, secret, { expiresIn: expiresInSeconds }, (error, token) => {
				if (error) {
					reject(error)
				}
				else {
					resolve(token)
				}
			})
		})
	}

	static getId(token, secret) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, secret, (error, decoded) => {
				if (error) {
					reject(error)
				}
				else {
					resolve(decoded.id)
				}
			})
		})
	}

}

module.exports = Tokens
