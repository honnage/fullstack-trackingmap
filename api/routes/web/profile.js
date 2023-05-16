const express = require('express')
const router = express.Router()
const profileController = require('../../controllers/profile')
const authCheck = require('../../controllers/authMiddleware')


router.get('/profile', authCheck, profileController.getProfile)

// router.put('/profile/update', authCheck, profileController.putProfile)



module.exports = router