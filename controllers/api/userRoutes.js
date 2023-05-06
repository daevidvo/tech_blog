const router = require('express').Router()
const {User, Post} = require('../../models')

router.post('/login', async(req,res)=>{
    try{
        const userData = User.findOne({where:{email: req.body.email}})

        if(!userData){
            res.status(400).json({message:'Invalid email or password. Please try again'})
            return
        }

        const validPassword = await User.checkPassword(req.body.password)
        
        if(!validPassword){
            res.status(400).json({message:'Invalid email or password. Please try again'})
            return
        }

        res.session.save(()=>{
            req.session.user_id = userData.id
            req.session.loggedIn = true;
        })

        res.json({user: userData, message: 'Login successful'})
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/logout', (req,res)=>{
    if(req.session.loggedIn){
        res.session.destroy(()=>{
            res.status(204).end();
        })
    }else{
        res.status(404).end();
    }
})

module.exports = router