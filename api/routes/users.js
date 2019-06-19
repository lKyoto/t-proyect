const express = require('express')
const router = express.Router()

const userController = require('../controllers/users')

/*
router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.delete('/:userID', userController.user_delete_id)

*/

router.post('/register', userController.register)

router.post('/login', userController.login)

module.exports = router