let controller= require('./controller')
const User = require('models/user')
// const User = require('./../models/user')
const { validationResult}=require('express-validator')

class userController extends controller{
    async getAllUser(req,res,next){
        try {
            //this.error('there is no any thing',500)
             //console.log(this.name);
            let users = await User.find({})
            res.render('users',{msg : "users",
                users: users,
                errors: req.flash('error'),
                message: req.flash('message')
            })
        } catch (err) {
            next(err)
        }
    }

    async seeOneUser(req,res,next){
        try {
            let user = await User.findOne({_id:req.params.id})
            if(!user){
                this.error('there is no such a user',404)
            }
            return res.render('user', {user:user}) 
        } catch (err) {
            next(err)
        }
    }

    async createUser(req,res,next){
        try {
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                req.flash('error',errors.array()) 
                return res.redirect('/user')
            }
            let newUser =new User({
                fullName: req.body.fullName,
                email: req.body.email,
                password:req.body.password
            })
            await newUser.save()
            req.flash('message','user was added successfuly') 
            return res.redirect('/user')            
        } catch (err) {
            next(err)
        } 
    }

    async updateUser(req,res,next){
        try {
            await User.updateMany({_id:req.params.id},{$set:req.body})
            req.flash('message','user was updated successfuly') 
            return res.redirect('/user')
        } catch (err) {
            next(err)
        }
    }

    async deleteUser(req,res,next){
        try {
            await User.deleteOne({_id:req.params.id})
            req.flash('message','user was deleted successfuly') 
            return res.redirect('/user')
        } catch (err) {
            next(err)
        }
    }
}
module.exports=new userController
