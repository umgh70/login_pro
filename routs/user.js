const express = require('express')
const router = express.Router()
// const User = require('./../models/user')
const {check}=require('express-validator')
//let users= require('./../users')
//const userController=require('./../controllers/userController')
const userController=require('controllers/userController')
const userValidator=require('validators/userValidators')


 // //query
// router.get('/', (req,res)=>{
//     res.send('Hello world!')
//     console.log(req.query)
// })
// //params
// router.get('/:username', (req,res)=>{
//     res.send('Hello world!')
//     console.log(req.params)
// })

//restfulAPI(get)
// router.get('/',(req,res)=>{
//     res.status(200).json({
//        data : users ,
//        success : true  
//     })
// })

router.get('/', userController.getAllUser.bind(userController)
    // async(req,res)=>{
    //     let users = await   User.find({})
    //     //console.log(req.flash('error'));
    //     res.render('users',{msg : "users",
    //         users: users,
    //         errors: req.flash('error'),
    //         message: req.flash('message')
    //     })
    // }
)

////params
router.get('/:id', userController.seeOneUser.bind(userController)
    // async(req,res)=>{
    //     let user = await User.findOne({_id:req.params.id})
    //     // let user = users.find( user =>{
    //     //     if(user.id == req.params.id)
    //     //         return user
    //     // })
    //     // res.status(200).json({
    //     //     data : user ,
    //     //     success : true  
    //     //  })
    //     return res.render('user', {user:user})
    // }  
)

//restfulAPI(post)
router.post('/',
    userValidator.handle(),
    // [
    //     check("email",'email is incorrect').isEmail(),
    //     check("password",'pass must be has 5 charecter at least').isLength({min:5})
    // ],
    userController.createUser.bind(userController)
    // async (req,res)=>{
    //     const errors=validationResult(req);
    //     if(!errors.isEmpty()){
    //        // return res.status(422).json({errors: errors.array()})
    //        req.flash('error',errors.array()) 
    //        return res.redirect('/user')
    //     }

    //     //console.log(req.body);
    //     let newUser =new User({
    //         fname: req.body.fname,
    //         lname: req.body.lname,
    //         email: req.body.email,
    //         password:req.body.password
    //     })
    //     await newUser.save()
    //     //users.push(req.body)
    //     console.log(req.flash('message','user was added successfuly'));
    //     req.flash('message ','user was added successfuly') 
    //     return res.redirect('/user')
    //     // res.status(200).json({
    //     //     data : "user was added successfuly" ,
    //     //     success : true  
    //     // })
    // }
)

//restfulAPI(put)
router.put('/:id',userController.updateUser.bind(userController)
    // async(req,res)=>{
    //     await User.updateMany({_id:req.params.id},{$set:req.body})
    //     // users = users.map(user=>{
    //     //     if(user.id == req.params.id){
    //     //         return req.body
    //     //     }
    //     //     else{
    //     //         return use r
    //     //     }
    //     // })
    //     // res.status(200).json({
    //     //     data : "user was updated successfuly" ,
    //     //     success : true  
    //     // })
    //     req.flash('message','user was updated successfuly') 
    //     return res.redirect('/user')
    // }
)

//restfulAPI(put)
router.delete('/:id', userController.deleteUser.bind(userController)
    // async (req,res)=>{
    //     await User.deleteOne({_id:req.params.id})
    //     // users = users.filter(user=>{
    //     //     if(user.id != req.params.id){
    //     //         return user
    //     //     }
    //     // })
    //     // res.status(200).json({
    //     //     data : "user was deleted successfuly" ,
    //     //     success : true  
    //     // })
    //     //console.log(users);
    //     req.flash('message','user was deleted successfuly') 
    //     return res.redirect('/user')
    // }
)

module.exports = router