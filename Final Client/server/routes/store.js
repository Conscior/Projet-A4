const { Router } = require('express')
const storeController = require('../controllers/store')


var router = Router()

router.get('/:id', storeController.get_store_info)

module.exports = router;
