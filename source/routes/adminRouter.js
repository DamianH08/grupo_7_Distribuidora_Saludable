const
    express = require('express'),
    router = express.Router(),
    adminCtrl = require('../controllers/adminCtrl');

router
    .get('/',adminCtrl.index)
    .get('/login',adminCtrl.login)
    .post('/login',adminCtrl.authAdmin)
    .get('/products',adminCtrl.showProducts)
    .get('/products/create',adminCtrl.createProduct)
    .post('/products/create',adminCtrl.storeProduct)
    .get('/products/:id',adminCtrl.showProduct)
    .get('/products/:id/edit',adminCtrl.editProduct)
    .post('/products/:id/edit',adminCtrl.storeEditedProduct)
    .get('/products/:id/delete',adminCtrl.deleteProduct)
    .post('/products/:id/delete',adminCtrl.storeDeletedProduct  )
    .get('/users',adminCtrl.users)
    ;

module.exports = router;