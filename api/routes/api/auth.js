const express = require('express')
const router = express.Router()
const authController = require('../../controllers/API_authController')

const authCheck = require('../../middleware/authMiddleware')
const auth = require('../../middleware/auth')

router.post('/login', authController.login)

router.post('/logout', authController.logout)

router.get('/userlist', auth.checkToken, authController.userlist)


module.exports = router

