const Person = require('./types/Person')
const Notification = require('./types/Notification')

function people(_, context) {
	return Person.getAll(context)
}

function person({ id }, context) {
	return Person.get(context, id)
}

function notifications(_, context) {
	return Notification.getAll(context.user.id)
}

const query = { people, person, notifications }

module.exports = query
