const express = require('express')
const router = express.Router()
const transactionsController = require('../../controllers/transactions')
const authCheck = require('../../middleware/authMiddleware')


router.get('/transactions', authCheck, transactionsController.pageTransactions)


module.exports = router