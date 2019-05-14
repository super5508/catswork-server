const { buildSchema } = require('graphql')

const gql = (template) => template.join('')

const schema = buildSchema(gql`
	enum EnumMonth {
		JAN
		FEB
		MAR
		APR
		MAY
		JUN
		JUL
		AUG
		SEP
		OCT
		NOV
		DEC
	}

	enum EnumIndustry {
		AGR
		ART
		CONS
		CORP
		EDU
		FIN
		GOOD
		GOV
		HLTH
		LEG
		MAN
		MED
		ORG
		REC
		SERV
		TECH
		TRAN
		OTHER
	}

	enum EnumSource {
		INFO_SESSION
		NETWORKING_SESSION
		COFFEE_CHAT
		OFFICE_VISIT
		LINKED_IN
		REFERRAL
		OTHER
	}

	enum EnumDegree {
		ASSOCIATE
		BACHELOR
		MASTER
		DOCTORAL
		PROFESSIONAL
		OTHER
	}

	enum EnumActivity {
		COLD_EMAIL
		EMAIL_FOLLOW_UP
		PHONE_CALL
		COFFEE_CHAT
		RE_CONNECT
		ASK_FOR_REFERALL
		OTHER
	}

	enum EnumNotification {
		ADDED_PERSON
		COMPLETED_ACTIVITY
		SCHEDULED_ACTIVITY
	}

	input SetUpInput {
		desiredIndustry: EnumIndustry!
		graduationMonth: EnumMonth!
		graduationYear: Int!
		degree: EnumDegree!
		major: Int!
	}

	input ActivityInput {
		activity: EnumActivity!
		activityCustom: String
		date: String!
	}

	type Activity {
		id: Int!
		owner: Int!
		person: Int!
		activity: EnumActivity!
		activityCustom: String
		date: String!
		status: Boolean!

		toggle: Activity!
		delete: Response!
	}

	type Person {
		id: Int!
		owner: Int!
		linkedInId: String
		first: String!
		last: String!
		company: String!
		industry: EnumIndustry
		position: String
		email: String
		phone: String
		location: String
		education: String
		hometown: String
		extracurriculars: String
		website: String
		notes: String
		source: EnumSource!
		sourceCustom: String

		activity: [Activity!]!
		anActivity(id: Int!): Activity

		addActivity(input: ActivityInput!): Activity!
	}

	input PersonInput {
		linkedInId: String
		first: String!
		last: String!
		company: String!
		industry: EnumIndustry
		position: String
		email: String
		phone: String
		location: String
		education: String
		hometown: String
		extracurriculars: String
		website: String
		notes: String
		source: EnumSource!
		sourceCustom: String
	}

	type Notification {
		id: Int!
		owner: Int!
		person: Int
		activity: Int
		type: EnumNotification!
		message: String!
		date: String!
	}

	type Response {
		ok: Boolean!
		errors: [String!]
	}

	type Query {
		people: [Person!]!
		person(id: Int!): Person
		notifications: [Notification!]!
	}

	type Mutation {
		person(id: Int!): Person

		setUp(input: SetUpInput!): Response!
		addPerson(input: PersonInput!): Person!
	}
`)

module.exports = schema
