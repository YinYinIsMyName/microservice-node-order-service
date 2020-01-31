const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const eurekaHelper = require('./eureka-helper')
require('dotenv').config()

const orderRoute = require('./routes')
const PORT = process.env.Order_PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//api for eureka http://localhost:8050/order-service/api/v1/order/allorder
app.use('/',orderRoute)
app.listen(PORT, () => {
    console.log(`Order is running on ${PORT}`)
})
eurekaHelper.registerWithEureka('order-service', PORT);