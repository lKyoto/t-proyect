const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const userController = require('../controllers/users')

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.delete('/:userID', checkAuth, userController.user_delete_id)

module.exports = router