const express = require('express')
const router = express.Router()
const devicesController = require('../../controllers/devices')


router.post('/insertDevice', devicesController.insertDevice)


module.exports = router