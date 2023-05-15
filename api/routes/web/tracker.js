const express = require('express')
const router = express.Router()
const trackerController = require('../../controllers/tracker')


router.get('/', trackerController.getIndex)

router.get('/device/:deviceId', trackerController.getDevice) // by device

router.get('/dashboard-test', trackerController.getDashboardTest)

router.post('/sendData', trackerController.sendData)

router.get('/lastTracing', trackerController.lastTracing_byDevices)

module.exports = router