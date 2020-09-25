const express = require('express');
const router = express.Router();
const products = require('../controllers/productsCtrlApi');

router
    .get('/',products.all)
    .get('/:id',products.one)
    .post('/:id',products.create)
    .patch('/:id',products.edit)
    .delete('/:id',products.delete)
    ;

module.exports = router;