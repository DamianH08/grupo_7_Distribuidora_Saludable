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
    .post('/login',validate.loginForm,userCtrl.login)
    .get('/register',userCtrl.showRegisterForm)
    .post('/register',validate.registerForm,userCtrl.register)
    ;

module.exports = router;
    