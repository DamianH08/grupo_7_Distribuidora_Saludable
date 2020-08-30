const express = require('express');

const router = express.Router();

const indexCtrl = require('../controllers/indexCtrl');

router
    .get('/',indexCtrl.index)
    .get('/locales',indexCtrl.locales)
    .get('/about',indexCtrl.about)
    .get('/cart',indexCtrl.cart)
    .get('/search',indexCtrl.search)
    .get('/test',(req,res)=>res.render('test'))
    ;

module.exports = router;