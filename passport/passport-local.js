const passport= require('passport')
const localStrategy= require('passport-local').Strategy
const User =require('models/user')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    let user = await User.findById(id)
    if(user) done(null,user)
})


passport.use("local.register",
     new localStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },
    async(req,email,password,done)=>{
        try {
            ////console.log('local');
            let user =await User.findOne({email:req.body.email})
            if(user){
                return done(null,false,req.flash('errors', "This user is already exist"))
            }
            //console.log('newUser');
            const newUser =new User({
                fullName: req.body.fullName,
                email:req.body.email,
                password:req.body.password
            })
            await newUser.save()
            done(null,newUser)
        } catch (error) {
            //console.log(error);
            return done(error,false,{message:error})
        }
    }

))


passport.use("local.login",
     new localStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },
    async(req,email,password,done)=>{
        try {
            //console.log("jingoli");
            let user =await User.findOne({email:req.body.email})
            //console.log(user);
            if(!user || user.password != req.body.password){
                //console.log(req.flash('errors', "invalid info"));
                return done(null,false,req.flash('errors', "invalid info"))
            }
            done(null,user)
        } catch (error) {
            return done(error,false,{message:error})
        }
    }
 
))