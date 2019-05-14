const yup = require('yup')

const connection = require('../connection')

const CREATE_PERSON_SCHEMA = yup.object().shape({
	linkedInId: yup.string().nullable(),
	first: yup.string().required('first required'),
	last: yup.string().required('last required'),
	company: yup.string().required('company required'),
	industry: yup.number().integer('industry invalid'),
	position: yup.string().nullable(),
	email: yup.string().email('email invalid').nullable(),
	phone: yup.string().nullable(),
	location: yup.string().nullable(),
	education: yup.string().nullable(),
	hometown: yup.string().nullable(),
	extracurriculars: yup.string().nullable(),
	website: yup.string().nullable(),
	notes: yup.string().nullable(),
	source: yup.number().required('source required').integer('source invalid'),
	sourceCustom: yup.string().nullable()
})

class People {

	static getPeopleByOwner(owner) {
		return connection.query('select * from people where owner=?', [owner])
	}

	static getPersonById(owner, id) {
		return connection.querySingleRow('select * from people where owner=? and id=?', [owner, id])
	}

	static createPerson(owner, linkedInId, first, last, company, industry, position, email, phone, location, education, hometown, extracurriculars, website, notes, source, sourceCustom) {
		return CREATE_PERSON_SCHEMA.validate({ linkedInId, first, last, company, industry, position, email, phone, location, education, hometown, extracurriculars, website, notes, source, sourceCustom })
			.then((result) => {
				return connection.query('insert into people (owner, linkedInId, first, last, company, industry, position, email, phone, location, education, hometown, extracurriculars, website, notes, source, sourceCustom) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [owner, result.linkedInId, result.first, result.last, result.company, result.industry, result.position, result.email, result.phone, result.location, result.education, result.hometown, result.extracurriculars, result.website, result.notes, result.source, result.sourceCustom])
			})
			.then(result => result.insertId)
	}

}


module.exports = People
