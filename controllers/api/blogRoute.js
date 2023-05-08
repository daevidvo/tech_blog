const router = require('express').Router()
const {User, Post, Comment} = require('../../models')
const sequelize = require('../config/connection.js')
const {AuthUser} = require('../../utils/auth.js')

router.get('/', AuthUser, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: Comment
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })
        if (!postData) {
            res.status(400).json({ message: 'Please log in'})
        }

        res.render('post')
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/create', AuthUser, async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        })

        if (!postData) {
            res.status(400).json({ message: 'Please log in :\'))))))))))))))))))))))))))'})
        }


    } catch (err) {
        res.status(500).json(err)
    }
})









module.exports = router