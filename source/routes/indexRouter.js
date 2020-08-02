const express = require('express');

const router = express.Router();

const indexCtrl = require('../controllers/indexCtrl');

router
    .get('/',indexCtrl.index)
    .get('/locales',indexCtrl.locales)
    .get('/about',indexCtrl.about)
    ;

module.exports = router;