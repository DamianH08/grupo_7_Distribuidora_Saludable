const express = require('express');

const router = express.Router();

const productsCtrl = require('../controllers/productsCtrl');

router
    .get('/',productsCtrl.index)
    .get('/search',productsCtrl.search)
    .get('/categories',productsCtrl.categories)
    .get('/categories/:cat',productsCtrl.category)
    .get('/:id',productsCtrl.showProduct)
    ;

module.exports = router;