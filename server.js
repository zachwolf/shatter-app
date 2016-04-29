'use strict'

let express = require('express')
	, app = express()

app.use(express.static('dist'))

app.listen(8675)

console.log('server started at localhost:8675')