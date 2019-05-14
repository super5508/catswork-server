const mysql = require('mysql')

const config = require('./config')
const NamedError = require('./NamedError')

class Connection {

	constructor() {
		this._connection = null
	}

	connect() {
		this._connection = mysql.createConnection({
			host: config.database.host,
			user: config.database.user,
			password: config.database.password,
			database: config.database.database
		})
	}

	query(query, values = undefined) {
		return new Promise((resolve, reject) => {
			this._connection.query(query, values, (error, results) => {
				if (error) {
					reject(error)
				}
				else {
					resolve(results)
				}
			})
		})
	}

	querySingleRow(query, values = undefined) {
		return this.query(query, values).then((results) => {
			if (results.length === 0) {
				throw NamedError.CONNECTION_NO_RESULT
			}
			else {
				return results[0]
			}
		})
	}

}

module.exports = new Connection()
