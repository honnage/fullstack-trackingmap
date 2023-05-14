const express = require('express')
const router = express.Router()
const trackerController = require('../../controllers/tracker')


router.get('/', trackerController.getIndex)
router.get('/dashboard-test', trackerController.getDashboardTest)

router.post('/sendData', trackerController.sendData)



module.exports = router