const express = require('express')
const router = express.Router()
const authController = require('../../controllers/API_authController')
const trackerController = require('../../controllers/API_trackerController')
const transactionsControlle = require('../../controllers/API_transactionsController')

const auth = require('../../middleware/auth')

router.post('/login', authController.login)

router.post('/logout', authController.logout)

router.get('/lastTracing', auth.checkToken, trackerController.lastTracing_byDevices)

router.get('/transactions', auth.checkToken, transactionsControlle.transactions)



module.exports = router

