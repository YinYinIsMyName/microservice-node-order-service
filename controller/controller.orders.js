const { OrderService } = require('../services')
const response = require('../model/response')
const request = require('request')

const addOrder = (req, res) => {
    console.log(req.body)
    //if type of customer id must be the same with customers Table
    const OrderRequestedValue = {
        customerID: req.body.customerID,
        bookID: req.body.bookID,
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    }
    OrderService.addOrder(OrderRequestedValue).then(data => {
        if (data.length == 0) {
            res.json(response({ message: "no data to be displayed", success: false }))
        }
        res.json(response({ success: true, payload: null }))
    }).catch(err => {
        res.json(response({ success: false, message: err }))
    })

}
const getAllorder = (req, res) => {
    return OrderService.getAllorder().then(data => {
        res.json(response({ success: true, payload: data }))
    })
        .catch(err => {
            res.json({ message: err, success: false })
        })
}

const getOrderById = (req, res) => {
    //query string /getbooks?id=1
    const id = req.query.id
    return OrderService.getOrderById(id).then(data => {
        //console.log(data[0].customerID)
        console.log({ data })
         let customer_url = "http://localhost:8050/customer-service/getbyId?id=" + `${data[0].customerID}`
         let book_url = "http://localhost:8050/book-service/getbooks?id=" + `${data[0].bookID}`

        try {

            request(customer_url, (err, response, body) => {
                let internalErr = JSON.parse(response.body)
                console.log(internalErr.status)
                if (internalErr.status == 404) {
                    res.json({ message: "API doesn't return any data" })

                }
                else {
                    let payload = JSON.parse(body)
                    var orderObject = [{ customerName: payload.payload[0].name, bookTitle: '' }]
                    console.log(orderObject)
                    request(book_url, (err, response, body) => {
                        internalErr = JSON.parse(response.body)
                        if (internalErr.status == 404) {
                            res.json({ message: "API doesn't return any data" })

                        }
                        else {
                            payload = JSON.parse(body)
                            orderObject[0].bookTitle = payload.payload[0].title
                            res.json({ success: true, payload: orderObject })
                        }


                    })
                }
            })
        }
        catch (err) {
            res.json(response({ message: err, success: false }))
        }
    })
        .catch(err => {
            res.json(response({ message: err, success: false }))
        })
}
module.exports = { addOrder, getAllorder, getOrderById }
