const router = require('express').Router()
const AuthUser = require('../utils/auth.js')
const {User, Post} = require('../models')

router.get('/', AuthUser, async (req,res)=>{
    try{
        const postData = Post.findAll({})
        const posts = (await postData).map((data) => data.get({plain: true}))

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

module.exports = router