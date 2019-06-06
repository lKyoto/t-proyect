const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const orderController = require('../controllers/orders')

router.get('/',orderController.orders_get_all)

router.get('/:orderID', orderController.order_by_id)

router.post('/', orderController.order_post)

router.patch('/:orderID', checkAuth, orderController.order_patch_id)

router.delete('/:orderID', orderController.order_delete_id)

module.exports = router