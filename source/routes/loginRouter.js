const express = require('express');

const router = express.Router();

const loginCtrl = require('../controllers/loginCtrl');

router
    .get('/login',loginCtrl.login)
    .get('/login/register',loginCtrl.register)
    ;

module.exports = router;
    