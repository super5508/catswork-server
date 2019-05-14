const yup = require('yup')

const connection = require('../connection')

const ADD_ACTIVITY_SCHEMA = yup.object().shape({
	activity: yup.string().required('activity required'),
	activityCustom: yup.string().ensure(),
	date: yup.date().required('date required').typeError('date required')
})

class Activity {

	static getActivityByPerson(owner, person) {
		return connection.query('select * from activity where owner=? and person=?', [owner, person])
	}

	static getActivityById(owner, person, id) {
		return connection.querySingleRow('select * from activity where owner=? and person=? and id=?', [owner, person, id])
	}

	static addActivity(owner, person, activity, activityCustom, date) {
		return ADD_ACTIVITY_SCHEMA.validate({ activity, activityCustom, date })
			.then((result) => {
				return connection.query('insert into activity (owner, person, activity, activityCustom, activityDate, status) values (?, ?, ?, ?, ?, false)', [owner, person, result.activity, result.activityCustom, result.date])
			})
			.then(result => result.insertId)
	}

	static setActivityStatus(id, status) {
		return connection.query('update activity set status=? where id=?', [status, id])
	}

	static deleteActivity(id) {
		return connection.query('delete from activity where id=?', [id])
	}

}

module.exports = Activity
