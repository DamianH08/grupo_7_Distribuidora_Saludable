const express = require('express');
const router = express.Router();
const users = require('../controllers/usersCtrlApi');

router
    .get('/',users.all)
    ;

module.exports = router;