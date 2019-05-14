const connection = require('../connection')

class Notifications {

	static getNotificationsByOwner(owner) {
		return connection.query('select * from notifications where owner=?', [owner])
	}

	static getNotificationsById(owner, id) {
		return connection.querySingleRow('select * from notifications where owner=? and id=?', [owner, id])
	}

	static createNotification(owner, person, activity, type, message) {
		return connection.query('insert into notifications (owner, person, activity, type, message, notificationDate) values (?, ?, ?, ?, ?, ?)', [owner, person, activity, type, message, new Date()])
			.then(result => result.insertId)
	}

	static delete(owner, person, activity, type) {
		let clauses = ['owner=?']
		let data = [owner]
		if (person) {
			clauses.push('person=?')
			data.push(person)
		}
		if (activity) {
			clauses.push('activity=?')
			data.push(activity)
		}
		if (type) {
			clauses.push('type=?')
			data.push(type)
		}

		return connection.query(`delete from notifications where ${clauses.join(' and ')}`, data)
	}

}

module.exports = Notifications
