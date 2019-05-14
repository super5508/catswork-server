function reverse(object) {
	const reverseObject = {}
	for (let key of Object.keys(object)) {
		reverseObject[object[key]] = key
	}

	return reverseObject
}

const EnumMonth = {
	JAN: 1,
	FEB: 2,
	MAR: 3,
	APR: 4,
	MAY: 5,
	JUN: 6,
	JUL: 7,
	AUG: 8,
	SEP: 9,
	OCT: 10,
	NOV: 11,
	DEC: 12
}
const EnumMonthReverse = reverse(EnumMonth)

const EnumIndustry = {
	AGR: 1,
	ART: 2,
	CONS: 3,
	CORP: 4,
	EDU: 5,
	FIN: 6,
	GOOD: 7,
	GOV: 8,
	HLTH: 9,
	LEG: 10,
	MAN: 11,
	MED: 12,
	ORG: 13,
	REC: 14,
	SERV: 15,
	TECH: 16,
	TRAN: 17,
	OTHER: 18
}
const EnumIndustryReverse = reverse(EnumIndustry)

const EnumSource = {
	INFO_SESSION: 1,
	NETWORKING_SESSION: 2,
	COFFEE_CHAT: 3,
	OFFICE_VISIT: 4,
	LINKED_IN: 5,
	REFERRAL: 6,
	OTHER: 7
}
const EnumSourceReverse = reverse(EnumSource)

const EnumDegree = {
	ASSOCIATE: 1,
	BACHELOR: 2,
	MASTER: 3,
	DOCTORAL: 4,
	PROFESSIONAL: 5,
	OTHER: 6
}
const EnumDegreeReverse = reverse(EnumDegree)

const EnumActivity = {
	COLD_EMAIL: 1,
	EMAIL_FOLLOW_UP: 2,
	PHONE_CALL: 3,
	COFFEE_CHAT: 4,
	RE_CONNECT: 5,
	ASK_FOR_REFERALL: 6,
	OTHER: 7
}
const EnumActivityReverse = reverse(EnumActivity)
const EnumActivityDisplay = {
	COLD_EMAIL: 'Cold email',
	EMAIL_FOLLOW_UP: 'Email follow-up',
	PHONE_CALL: 'Phone call',
	COFFEE_CHAT: 'Coffee chat',
	RE_CONNECT: 'Re-connect',
	ASK_FOR_REFERALL: 'Asked for referral',
	OTHER: 'Other'
}

const EnumNotification = {
	ADDED_PERSON: 1,
	COMPLETED_ACTIVITY: 2,
	SCHEDULED_ACTIVITY: 3
}
const EnumNotificationReverse = reverse(EnumNotification)

module.exports = { EnumMonth, EnumMonthReverse, EnumIndustry, EnumIndustryReverse, EnumSource, EnumSourceReverse, EnumDegree, EnumDegreeReverse, EnumActivity, EnumActivityReverse, EnumActivityDisplay, EnumNotification, EnumNotificationReverse }
