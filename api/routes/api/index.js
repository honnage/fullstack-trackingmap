import routerx from 'express-promise-router'

const trackerController = require('../../controllers/tracker')

import ErrorRouter from '../web/error'
import TrackerRouter from '../web/tracker'

const router = routerx()

router.get('/', trackerController.getIndex)

router.use('/error', ErrorRouter)
router.use('/tracker', TrackerRouter)

export default router

