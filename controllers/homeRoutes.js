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
                    model: User,
                    attributes: {
                        exclude: ['password', 'email']
                    }
                },
                {
                    model: Comment,
                    include: {
                        model: User
                    }
                }
            ]
        })

        
        const post = postData.get({plain: true})
    
        console.log(post)
            res.render('post', {
                post,
                loggedIn: req.session.loggedIn
            })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/dashboard', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.render('dashboard', {
                loggedIn: req.session.loggedIn,
                user_id: req.session.user_id
            })
        } else {
            res.render('dashboard')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router