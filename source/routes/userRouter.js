const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/usrCtrl');

router
    .get('/',(req,res)=>res.redirect('/users/login'))
    .get('/cart',userCtrl.cart)
    .get('/login',userCtrl.showLoginForm)
    .post('/login',userCtrl.login)
    .get('/register',userCtrl.showRegisterForm)
    .post('/register',userCtrl.register)
    ;

module.exports = router;
    