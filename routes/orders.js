const express = require('express')

//router objects
const router = express.Router();

const { getAllOrders, placeOrder, getOneOrder, updateOrderStatus, deleteOrder, getTotalSales, getOrderCount } = require('../controllers/orders')

router.get('/', getAllOrders)

router.post('/', placeOrder)

router.get('/:id', getOneOrder )

router.put('/:id', updateOrderStatus )

router.delete('/:id', deleteOrder )

router.get('/get/totalSales', getTotalSales)

router.get('/get/count', getOrderCount)

router.get('/get/userOrders/:userid', )

module.exports = router