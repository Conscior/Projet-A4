const { Router } = require('express')
const { requireToken } = require('../middlewares/auth')
const orderController = require('../controllers/order')

var router = Router()

// Get a specefic order of currently logged in User
router.get('/:id', requireToken, orderController.get_order)

// Get
router.get('/', requireToken, orderController.get_orders)

// Create an order
router.post('/', requireToken, orderController.post_order)

module.exports = router;
