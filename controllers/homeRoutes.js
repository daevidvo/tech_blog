const router = require('express').Router()
const {User, Post, Comment} = require('../models')

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

        let sameAuthor;
        if (req.session.user_id === post.user_id) {
            sameAuthor = true;
        }
    
        res.render('post', {
            post,
            loggedIn: req.session.loggedIn,
            sameAuthor: sameAuthor,
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/dashboard', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const postData = await Post.findAll({where: {user_id: req.session.user_id},
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

            console.log(postData)
            const post = await postData.map((data) => 
                data.get({plain: true})
            )

            console.log(post)

            res.render('dashboard', {
                post,
                loggedIn: req.session.loggedIn,
                user_id: req.session.user_id
            })
        } else {
            res.redirect('/login')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/create', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.render('create_post', {
                loggedIn: req.session.loggedIn,
                user_id: req.session.user_id
            })
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/edit', async (req, res) => {
    try {
        res.render('edit', {
            post_id: req.body.post_id
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router