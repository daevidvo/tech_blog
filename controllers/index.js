const router = require('express').Router()

const apiRoutes = require('./api')
const homeRoutes = require('./homeRoutes.js')

router.get('/', homeRoutes)
router.get('/api', apiRoutes)

module.exports = router