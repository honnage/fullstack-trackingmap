const express = require('express')
const router = express.Router()
const trackerController = require('../../controllers/tracker')
const authCheck = require('../../controllers/authMiddleware')


router.get('/', authCheck, trackerController.getIndex)

router.get('/device/:deviceNumber', authCheck, trackerController.getDevice) // by device

router.get('/dashboard-test', authCheck, trackerController.getDashboardTest)

router.post('/sendData', trackerController.sendData)

router.get('/lastTracing', authCheck, trackerController.lastTracing_byDevices)

module.exports = router