const express = require('express');

const router = express.Router();

const indexCtrl = require('../controllers/indexCtrl');

router
    .get('/',indexCtrl.index)
    .get('/locales',indexCtrl.locales)
    .get('/about',indexCtrl.about)
    .get('/cart',indexCtrl.cart)
    .get('/productDetail',indexCtrl.productDetail)
    .get('/search',indexCtrl.search)
    ;

module.exports = router;