const { db } = require('../db')


const addOrder = OrderValue => {

    return db.addOrder(OrderValue)
}
const getAllorder = _ => {
    return db.getAllorder()
}

const getOrderById = id => {
    return db.getOrderById(id)
}
module.exports = { addOrder, getAllorder ,getOrderById }