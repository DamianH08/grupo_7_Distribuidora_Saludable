const express = require('express');

const router = express.Router();

const productsCtrl = require('../controllers/productsCtrl');

router
    .get('/',productsCtrl.index)
    ;

module.exports = router;