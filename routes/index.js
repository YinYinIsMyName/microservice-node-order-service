const express = require('express')
const route = express.Router()
const OrderRoute = require('./routes.orders')

route.use('/',OrderRoute)
module.exports = route