const router = require('express').Router()

const apiRoutes = require('./api')
const homeRoutes = require('./homeRoutes.js')

router.get('/api', apiRoutes)
router.get('*', homeRoutes)

module.exports = router