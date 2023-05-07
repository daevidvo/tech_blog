const router = require('express').Router()
const {User, Post} = require('../models')

router.get('/', async (req,res)=>{
    try{
        const postData = Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })
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