const express = require('express')
const route = express.Router()
const {OrderController} = require('../controller')

route.post('/addorder',OrderController.addOrder)
route.get('/allorder',OrderController.getAllorder)
route.get('/getorder',OrderController.getOrderById)
module.exports = route