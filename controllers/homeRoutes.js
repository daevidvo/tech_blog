const router = require('express').Router()
const {User, Post, Comment} = require('../models')
const sequelize = require('../config/connection.js')

router.get('/', async (req,res)=>{
    try{
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment
                }
            ]
        })
        const posts = postData.map((data) => data.get({plain: true}))

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        })
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/login', (req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/')
    }
    res.render('login')
})

router.get('/post/:id', async (req, res) => {
    try { 
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: 'user',
                    attributes: ['name']
                }
            ]
        })

        if (!postData) {
            res.status(400).json({ message: 'No posts with this id exists' })
        } else {
            res.render('', {
                postData,
                loggedIn: req.session.loggedIn
            })
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router