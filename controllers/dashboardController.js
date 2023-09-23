let controller= require('./controller')
const Contact = require('../models/contact')
// const User = require('./../models/user')
const { validationResult}=require('express-validator')

class dashboardController extends controller{

    async index(req,res,next){
        try {
            console.log('dashboard');
            let contacts = await Contact.find({ownerEmail:req.user.email})
            res.render('dashboard/index',{msg : "contact",
                contacts: contacts,
                errors: req.flash('error'),
                message: req.flash('message')
            })    
            console.log(contacts);
            //res.render('dashboard/index')
            
        } catch (err) {
            next(err)
        }
    } 
    async seeOneContact(req,res,next){
        try {
            let contact = await Contact.findOne({_id:req.params.id})
            if(!contact){
                this.error('there is no such a contact',404)
            }
            return res.render('dashboard/contact', {contact:contact}) 
        } catch (err) {
            next(err)
        }
    }
    async createContact(req,res,next){
        try {
            
            console.log('createContact');
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                req.flash('error',errors.array()) 
                return res.redirect('/user')
            }
            let newContact =new Contact({
                ownerEmail: req.user.email,
                name: req.body.name,
                phoneNo: req.body.phoneNo,
                address: req.body.address,
                status: req.body.status
            })
            console.log('createSuccess');
            console.log(newContact);
            await newContact.save()
            req.flash('message','Contact was added successfuly') 
            return res.redirect('/dashboard')      
            
        } catch (err) {
            next(err)
        }
    } 
    async updateContact(req,res,next){
        try {
            await Contact.updateMany({_id:req.params.id},{$set:req.body})
            req.flash('message','Contact was updated successfuly') 
            return res.redirect('/dashboard')
        } catch (err) {
            next(err)
        }
    }
    async deleteContact(req,res,next){
        try {
            await Contact.deleteOne({_id:req.params.id})
            req.flash('message','user was deleted successfuly') 
            return res.redirect('/dashboard')
        } catch (err) {
            next(err)
        }
    }
   
}
module.exports=new dashboardController
