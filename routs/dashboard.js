const express = require('express')
const router = express.Router()
const dashboardController=require('../controllers/dashboardController')

router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
        res.redirect('/auth/login')
    
})

router.get('/',dashboardController.index.bind(dashboardController))
router.get('/:id', dashboardController.seeOneContact.bind(dashboardController))
router.post('/',dashboardController.createContact.bind(dashboardController))
router.put('/:id',dashboardController.updateContact.bind(dashboardController))
router.delete('/:id',dashboardController.deleteContact.bind(dashboardController))


module.exports = router