const ActivityService = require('../../services/Activity')
const People = require('../../services/People')
const Notifications = require('../../services/Notifications')
const NamedError = require('../../NamedError')
const dateUtil = require('../../dateUtil')

const { EnumActivity, EnumActivityReverse, EnumActivityDisplay, EnumNotification } = require('../enums')

class Activity {

	constructor(row) {
		this.id = row.id
		this.owner = row.owner
		this.person = row.person
		this.activity = EnumActivityReverse[row.activity]
		this.activityCustom = row.activityCustom
		this.date = row.activityDate.toISOString()
		this.status = row.status
	}

	get toggle() {
		if (this.status) {
			Notifications.delete(this.owner, this.person, this.id, EnumNotification.COMPLETED_ACTIVITY)
		}
		else {
			People.getPersonById(this.owner, this.person)
				.then(({ first, last }) => {
					Notifications.createNotification(this.owner, this.person, this.id, EnumNotification.COMPLETED_ACTIVITY, `Completed '${this.activity === 'OTHER' ? this.activityCustom || 'Other' : EnumActivityDisplay[this.activity]}' with ${first} ${last}`)
				})
		}

		return ActivityService.setActivityStatus(this.id, !this.status)
			.then(() => ActivityService.getActivityById(this.owner, this.person, this.id))
			.then(row => new Activity(row))
	}

	get delete() {
		Notifications.delete(this.owner, this.person, this.id)

		return ActivityService.deleteActivity(this.id)
			.then(() => ({ ok: true }))
	}

	static getAll(owner, person) {
		return ActivityService.getActivityByPerson(owner, person)
			.then(rows => rows.map(row => new Activity(row)))
	}

	static get(owner, person, id) {
		return ActivityService.getActivityById(owner, person, id)
			.then(row => new Activity(row))
			.catch((error) => {
				if (error === NamedError.CONNECTION_NO_RESULT) {
					return null
				}
				else {
					throw error
				}
			})
	}

	static add(owner, person, input) {
		return ActivityService.addActivity(owner, person, EnumActivity[input.activity], input.activityCustom, new Date(input.date))
			.then(id => ActivityService.getActivityById(owner, person, id))
			.then(row => new Activity(row))
			.then((activity) => {
				People.getPersonById(owner, person)
					.then(({ first, last }) => {
						Notifications.createNotification(owner, person, activity.id, EnumNotification.SCHEDULED_ACTIVITY, `Scheduled '${activity.activity === 'OTHER' ? activity.activityCustom || 'Other' : EnumActivityDisplay[activity.activity]}' with ${first} ${last} for ${dateUtil.formatDate(new Date(activity.date))} at ${dateUtil.formatTime(new Date(activity.date))}`)
					})

				return activity
			})
	}

}

module.exports = Activity
