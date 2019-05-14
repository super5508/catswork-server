const graphqlHttp = require('express-graphql')

const auth = require('../auth')

const schema = require('../graphQL/schema')
const query = require('../graphQL/query')
const mutation = require('../graphQL/mutation')

const rootValue = Object.assign({}, query, mutation)

function registerGraphQLHandlers(app) {
	app.use('/graphql', auth.middleware(auth.ActiveStep.SET_UP), graphqlHttp({
		schema, rootValue,
		graphiql: true
	}))
}

module.exports = registerGraphQLHandlers
