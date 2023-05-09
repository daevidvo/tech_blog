const router = require('express').Router()
const {User, Post, Comment} = require('../../models')
const {AuthUser} = require('../../utils/auth.js')
const {createdOnDate} = require('../../utils/helpers.js')

router.post('/create', AuthUser, async (req, res) => {
    try {
        const commentData = await Comment.create({
            text: req.body.text,
            dateCreated: createdOnDate(),
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })

        if (!commentData) {
            res.status(400).json({message: 'error creating message'})
        }

        res.status(200).json({message: 'comment created'})
    } catch (err) {
        res.status(500).json(err)
    }
})







module.exports = router