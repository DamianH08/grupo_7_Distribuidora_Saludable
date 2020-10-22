const express = require('express');
const router = express.Router();
const products = require('../controllers/productsCtrlApi');

router
    .get('/',products.all)
    .post('/',products.create)
    .get('/variantTypes',products.variantTypes)
    .get('/categories',products.categories)
    .get('/:id',products.one)
    .patch('/:id',products.edit)
    .delete('/:id',products.delete)
    ;

module.exports = router;