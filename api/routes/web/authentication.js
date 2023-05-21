const express = require('express')
const router = express.Router()
const authenticationController = require('../../controllers/authentication')
const authCheck = require('../../middleware/authMiddleware')

router.get('/login', authenticationController.getPageLogin)

router.post('/api/login', authenticationController.login)

router.post('/api/register', authenticationController.register)

router.get('/logout', authenticationController.logout)

router.post('/api/reset-password', authCheck, authenticationController.resetPassword)

module.exports = router