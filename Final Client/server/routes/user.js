const { Router } = require('express')
const userController = require('../controllers/user')
const { requireToken } = require('../middlewares/auth')


var router = Router()

//Get user info
router.get('/', requireToken, userController.user_getInfo) //Hash password and login the user (Create jwt token)

//Update user info
router.put('/', requireToken, userController.user_update) //Hash password and login the user (Create jwt token)

//Delete user
router.delete('/', requireToken, userController.user_delete) // Create a jwt token


module.exports = router;
