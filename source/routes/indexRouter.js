const express = require('express');

const router = express.Router();

const indexCtrl = require('../controllers/indexCtrl');

const log = require('../middlewares/loggedUsers')
router
    .get('/',log.isLogged,indexCtrl.index)
    .get('/locales',indexCtrl.locales)
    .get('/about',indexCtrl.about)
    .get('/cart',indexCtrl.cart)
    .get('/search',indexCtrl.search)
    .get('/test',(req,res)=>res.render('test'))
    ;

module.exports = router;