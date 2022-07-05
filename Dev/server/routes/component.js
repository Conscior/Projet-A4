const { Router } = require('express')
const componentController = require('../controllers/component')
const { requireToken } = require('../middlewares/auth')


var router = Router()

router.get('/', componentController.get_components)

router.post('/', requireToken, componentController.post_component)

module.exports = router;
