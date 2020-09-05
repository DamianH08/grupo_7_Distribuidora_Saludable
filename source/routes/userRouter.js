const 
    express = require('express'),
    router = express.Router(),
    userCtrl = require('../controllers/usrCtrl'),
    validate = require('../middlewares/validators')
    ;

router
    .get('/',(req,res)=>res.redirect('/users/login'))
    .get('/cart',userCtrl.cart)
    .get('/login',userCtrl.showLoginForm)
    .post('/login',validate.loginForm,userCtrl.authUser)
    .get('/register',userCtrl.showRegisterForm)
    .post('/register',validate.registerForm,userCtrl.register)
    .get('/test',userCtrl.test)
    ;

module.exports = router;
    