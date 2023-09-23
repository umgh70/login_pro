const validator=require('./validator')
const {check}=require('express-validator')

module.exports=new class authValidators extends validator{
    register(){
        return [
            check("email",'email is incorrect').isEmail(),
            check("password",'pass must be has 5 charecter at least').isLength({min:5})
        ]
    }
    login(){
        return [
            check("email",'email is incorrect').isEmail(),
            check("password",'pass must be has 5 charecter at least').isLength({min:5})
        ]
    }  

}