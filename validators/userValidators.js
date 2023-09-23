const validator=require('./validator')
const { check}=require('express-validator')

module.exports=new class userValidators extends validator{
    handle(){
        return [
            check("email",'email is incorrect').isEmail(),
            check("password",'pass must be has 5 charecter at least').isLength({min:5})
        ]
    } 

}