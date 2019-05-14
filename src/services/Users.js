const yup = require('yup')

const connection = require('../connection')
const ActiveStep = require('../ActiveStep')

const SET_UP_SCHEMA = yup.object().shape({
	desiredIndustry: yup.number().required('desiredIndustry required').integer('desiredIndustry invalid'),
	graduationMonth: yup.number().required('graduationMonth required').integer('graduationMonth invalid'),
	graduationYear: yup.number().typeError('graduationYear invalid').required('graduationYear required').integer('graduationYear invalid').min(1900, '1900-2030').max(2030, '1900-2030'),
	degree: yup.number().required('degree required').integer('degree invalid'),
	major: yup.number().required('major required').integer('major invalid').min(1, '1-319').max(319, '1-319')
})

class Users {

	static getUserById(id) {
		return connection.querySingleRow('select * from users where id=?', [id])
	}

	static getUserByEmail(email) {
		return connection.querySingleRow('select * from users where email=?', [email])
	}

	static getUserIdByEmail(email) {
		return connection.querySingleRow('select id from users where email=?', [email]).then(row => row.id)
	}

	static createUser(email, accessToken, refreshToken) {
		return connection.query('insert into users (email, accessToken, refreshToken, activeStep) values (?, ?, ?, ?)', [email, accessToken, refreshToken, ActiveStep.SET_UP])
			.then(rows => rows.insertId)
	}

	static updateUserTokens(id, accessToken, refreshToken = undefined) {
		let query = 'update users set accessToken=?'
		let values = [accessToken]
		if (refreshToken) {
			query += ', refreshToken=?'
			values.push(refreshToken)
		}
		query += ' where id=?'
		values.push(id)

		return connection.query(query, values)
	}

	static setUp(owner, desiredIndustry, graduationMonth, graduationYear, degree, major) {
		return SET_UP_SCHEMA.validate({ desiredIndustry, graduationMonth, graduationYear, degree, major })
			.then((result) => {
				return connection.query('update users set activeStep=?, desiredIndustry=?, graduationMonth=?, graduationYear=?, degree=?, major=? where id=?', [ActiveStep.CONNECT_LINKED_IN, result.desiredIndustry, result.graduationMonth, result.graduationYear, result.degree, result.major, owner])
			})
	}

	static updateLinkedInAccessToken(id, accessToken) {
		return connection.query('update users set activeStep=?, linkedInAccessToken=? where id=?', [ActiveStep.ACTIVE, accessToken, id])
	}

}

module.exports = Users
