const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const orderController = require('../controllers/orders')

router.get('/',orderController.orders_get_all)

router.get('/:orderId', orderController.order_by_id)

router.post('/', orderController.order_post)

router.patch('/:orderId', checkAuth, orderController.order_patch_id)

router.delete('/:orderId', orderController.order_delete_id)

module.exports = router