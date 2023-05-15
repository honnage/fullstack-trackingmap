const express = require('express')
const router = express.Router()
const authenticationController = require('../../controllers/authentication')

router.get('/login', authenticationController.getPageLogin)

router.post('/api/login', authenticationController.login)

router.post('/api/register', authenticationController.register)

router.get('/logout', authenticationController.logout)

router.post('/api/reset-password', authenticationController.resetPassword)

module.exports = router