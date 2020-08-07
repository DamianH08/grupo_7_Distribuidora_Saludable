const express = require('express');

const router = express.Router();

const loginCtrl = require('../controllers/usrCtrl');

router
    .get('/',loginCtrl.login)
    .get('/register',loginCtrl.register)
    ;

module.exports = router;
    