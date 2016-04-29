var express = require('express')
	, livereload = require('livereload')
	, app = express()

app.use(express.static('dist'))

app.listen(8675)

livereload = require('livereload')
server = livereload.createServer()
server.watch(__dirname + "/dist")

console.log('server started at localhost:8675')