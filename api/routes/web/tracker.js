const express = require('express')
const router = express.Router()
const trackerController = require('../../controllers/tracker')


router.get('/', trackerController.getIndex)



module.exports = router