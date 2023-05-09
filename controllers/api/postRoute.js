const router = require('express').Router()
const {User, Post, Comment} = require('../../models')
const sequelize = require('../../config/connection.js')
const {AuthUser} = require('../../utils/auth.js')
const {createdOnDate} = require('../../utils/helpers.js')

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

router.put('/edit/:id', AuthUser, async (req, res) => {
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                text: req.body.text,
                user_id: req.session.id
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )

        if (!postData) {
            req.status(400).json({ message: 'Please try again later'})
        } else {
            res.render(`post/${postData.id}`, {
                postData,
                loggedIn: req.session.id,
            })
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/create', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            text: req.body.text,
            dateCreated: createdOnDate(),
            user_id: req.session.user_id
        })

        if (!postData) {
            res.status(400).json({ message: 'Please log in :\'))))))))))))))))))))))))))'})
        }

        res.status(200).json({message: 'post created'})
    } catch (err) {
        res.status(500).json(err)
    }
})









module.exports = router