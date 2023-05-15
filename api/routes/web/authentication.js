const express = require('express')
const router = express.Router()
const authenticationController = require('../../controllers/authentication')

router.post('/login', authenticationController.login)

router.post('/register', authenticationController.register)


module.exports = router