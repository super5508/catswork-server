const express = require('express')

const config = require('../config')

function registerClientHandlers(app) {
	app.use(express.static(config.client.staticRoot))

	app.get('*', (request, response) => {
		response.sendFile(config.client.htmlPath)
	})
}

module.exports = registerClientHandlers
