const router = require('express').Router()
const {User} = require('../../models')

router.post('/login', async(req,res)=>{
    try{
        const userData = await User.findOne({where:{email: req.body.email}})

        if(!userData){
            res.status(400).json({message:'Invalid email or password. Please try again'})
            return
        }

        const validPassword = await userData.checkPassword(req.body.password)

        if(!validPassword){
            res.status(400).json({message:'Invalid email or password. Please try again'})
            return
        }

        req.session.save(()=>{
            req.session.user_id = userData.id
            req.session.loggedIn = true;

            res.status(200).json({message: 'Login successful'})
        })
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        req.session.save(() => {
            if (userData) {
                req.session.loggedIn = true;
            } else {
                req.status(400).json({message: 'Invalid email or password, please try again.'})
            }
        })

        res.status(200).json({message: 'signup successful'})
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/logout', (req,res)=>{
    if(req.session.loggedIn){
        req.session.destroy(()=>{
            res.status(204).end();
        })
    }else{
        res.status(404).end();
    }
})

module.exports = router