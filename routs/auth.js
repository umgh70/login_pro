const express = require('express')
const router = express.Router()
const authController=require('controllers/authController')
const authValidator=require('validators/authValidators')

router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        console.log(req.user)
        return res.redirect('/dashboard')
    }
        next()
    
})

router.get('/login',authController.loginForm.bind(authController))
router.get('/register', authController.registerForm.bind(authController))

router.post('/login', authValidator.login() ,authController.login.bind(authController))
router.post('/register',authValidator.register(),authController.register.bind(authController))

module.exports = router