const Notifications = require('../../services/Notifications')

const { EnumNotificationReverse } = require('../enums')

class Notification {

	constructor(row) {
		this.id = row.id
		this.owner = row.owner
		this.person = row.person
		this.activity = row.activity
		this.type = EnumNotificationReverse[row.type]
		this.message = row.message
		this.date = row.notificationDate.toISOString()
	}

	static getAll(owner) {
		return Notifications.getNotificationsByOwner(owner)
			.then(rows => rows.map(row => new Notification(row)))
	}

}

module.exports = Notification
