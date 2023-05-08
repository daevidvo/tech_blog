const router = require('express').Router()
const userRoutes = require('./userRoutes.js')
const commentRoutes = require('./commentRoutes.js')
const postRoutes = require('./postRoute.js')

router.use('/users', userRoutes)
router.use('/comments', commentRoutes)
router.use('/posts', postRoutes)

module.exports = router