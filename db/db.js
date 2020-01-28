const mysql2 = require('mysql2')
const util = require('util')



const mypool = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

query = util.promisify(mypool.query).bind(mypool)

const addOrder = orderValues => {
    const { customerID, bookID, initialDate, deliveryDate } = orderValues
    return query(`INSERT INTO order_facts(customerID,bookID,initialDate,deliveryDate) VALUES (?,?,?,?)`, [customerID, bookID, initialDate, deliveryDate])
}
const getAllorder = _ => {
    return query(`SELECT * FROM order_facts`)
}
const getOrderById = id => {
    return query(`SELECT * FROM order_facts WHERE id=${id}`)
}
module.exports = { addOrder, getAllorder ,getOrderById }