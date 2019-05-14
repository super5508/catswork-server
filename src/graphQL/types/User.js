const Users = require('../../services/Users')

const { EnumMonth, EnumIndustry, EnumDegree } = require('../enums')

class User {

	static setUp(context, input) {
		return Users.setUp(context.user.id, EnumIndustry[input.desiredIndustry], EnumMonth[input.graduationMonth], input.graduationYear, EnumDegree[input.degree], input.major)
			.then(() => ({ ok: true }))
	}

}

module.exports = User
