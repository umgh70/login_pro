const { config } = require('dotenv')
const express = require('express')
const router = express.Router()


router.use('/user',require('./user'))
router.use('/auth',require('./auth'))
router.use('/dashboard',require('./dashboard'))

// router.get('/logout',(req,res)=>{
//     console.log(req.logout());
//     req.logOut()
//     console.log('logout2');
//     res.redirect('/')
// })

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });


router.all('*', async (req,res,next)=>{
    //console.log('404');
    try {
        //console.log('40gbhjk4');
        let err = new Error('there is no this pg')
        err.status=404
        throw err
    } catch (err) {
        next(err)
    }
})

//modiriyate khataha 
router.use(async(err,req,res,next)=>{
    const code=err.status || "500"
    const message=err.message || ""
    const stack=err.stack || ""
    //this line for developer
    let debug=false
    //
    if(debug == true){
        return res.render('errors/developer',{message,stack})
    }else{
        return res.render(`errors/${code}`,{message,stack})
    }

})

module.exports = router