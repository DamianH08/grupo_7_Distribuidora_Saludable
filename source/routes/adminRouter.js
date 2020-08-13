const
    express = require('express'),
    router = express.Router(),
    adminCtrl = require('../controllers/adminCtrl');

router
    .get('/',adminCtrl.index)
    .get('/products',adminCtrl.showProducts)
    .get('/products/create',adminCtrl.createProduct)
    .post('/products/create',adminCtrl.storeProduct)
    .get('/products/:id',adminCtrl.showProduct)
    .get('/products/:id/edit',adminCtrl.editProduct)
    .post('/products/:id/edit')
    ;

module.exports = router;