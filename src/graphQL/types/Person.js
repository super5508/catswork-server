const People = require('../../services/People')
const Notifications = require('../../services/Notifications')
const NamedError = require('../../NamedError')

const { EnumIndustry, EnumIndustryReverse, EnumSource, EnumSourceReverse, EnumNotification } = require('../enums')

const Activity = require('./Activity')

class Person {

	constructor(row) {
		this.id = row.id
		this.owner = row.owner
		this.linkedInId = row.linkedInId
		this.first = row.first
		this.last = row.last
		this.company = row.company
		this.industry = EnumIndustryReverse[row.industry]
		this.position = row.position
		this.email = row.email
		this.phone = row.phone
		this.location = row.location
		this.education = row.education
		this.hometown = row.hometown
		this.extracurriculars = row.extracurriculars
		this.website = row.website
		this.notes = row.notes
		this.source = EnumSourceReverse[row.source]
		this.sourceCustom = row.sourceCustom
	}

	get activity() {
		return Activity.getAll(this.owner, this.id)
	}

	anActivity({ id }) {
		return Activity.get(this.owner, this.id, id)
	}

	addActivity({ input }) {
		return Activity.add(this.owner, this.id, input)
	}

	static getAll(context) {
		return People.getPeopleByOwner(context.user.id)
			.then(rows => rows.map(row => new Person(row)))
	}

	static get(context, id) {
		return People.getPersonById(context.user.id, id)
			.then(row => new Person(row))
			.catch((error) => {
				if (error === NamedError.CONNECTION_NO_RESULT) {
					return null
				}
				else {
					throw error
				}
			})
	}

	static add(context, input) {
		return People.createPerson(context.user.id, input.linkedInId, input.first, input.last, input.company, EnumIndustry[input.industry], input.position, input.email, input.phone, input.location, input.education, input.hometown, input.extracurriculars, input.website, input.notes, EnumSource[input.source], input.sourceCustom)
			.then(id => People.getPersonById(context.user.id, id))
			.then(row => new Person(row))
			.then((person) => {
				Notifications.createNotification(context.user.id, person.id, null, EnumNotification.ADDED_PERSON, `Added ${person.first} ${person.last}`)

				return person
			})
	}

}

module.exports = Person
