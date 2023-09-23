let controller= require('./controller')
const User = require('models/user')
// const User = require('./../models/user')
const passport= require('passport')
const { validationResult}=require('express-validator')


class AuthController extends controller{

    async loginForm(req,res,next){
        try {
            //console.log('loginForm');
            res.render('auth/login')
            
        } catch (err) {
            next(err)
        }
    } 
    async registerForm(req,res,next){
        try {
            //console.log('register')
            res.render('auth/register')
        } catch (err) {
            next(err)
        }
    }

    async login(req,res,next){
        try {
           //console.log('login');
           const errors=validationResult(req);
           //console.log(errors);
            if(!errors.isEmpty()){
                let myErrors=errors.array().map(err=>err.msg)
                req.flash('errors',myErrors) 
                return res.redirect('/auth/login')
            }
            //console.log('success');
            passport.authenticate('local.login',(err,user)=>{
                //console.log(user);
                if (!user) {
                    return res.redirect('/auth/login')
                }
                req.logIn(user,err=>{
                    //console.log("login");
                    return res.redirect('/dashboard')
                })
            })(req,res,next)
        } catch (err) {
            next(err)
        }
    }

    async register(req,res,next){
        try {
            
            const errors=validationResult(req);
            //console.log('register');
            //console.log(errors);
            if(!errors.isEmpty()){

                req.flash('error',errors.array()) 
                return res.redirect('/auth/register')
            }
            console.log('success');
            passport.authenticate('local.register',{
                successRedirect:'/dashboard',
                failureRedirect:'/auth/register',
                failureFlash:true
            })(req,res,next)
            //console.log('fail');
        } catch (err) {
            next(err)
        }
    }

}
module.exports=new AuthController
