const { Router } = require('express')
const authController = require('../controllers/auth')
const { requireToken } = require('../middlewares/auth')


var router = Router()

router.post('/signup', authController.signup_post) //Hash password and login the user (Create jwt token)

router.post('/login', authController.login_post) // Create a jwt token

//Verify user token
router.get('/verify', authController.verify_user)

module.exports = router;
