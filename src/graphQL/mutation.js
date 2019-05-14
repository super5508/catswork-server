const User = require('./types/User')
const Person = require('./types/Person')

function setUp({ input }, context) {
	return User.setUp(context, input)
}

function addPerson({ input }, context) {
	return Person.add(context, input)
}

const mutation = { setUp, addPerson }

module.exports = mutation
