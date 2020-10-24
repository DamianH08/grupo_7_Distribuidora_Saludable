const express = require('express');
const router = express.Router();
const users = require('../controllers/usersCtrlApi');

router
    .get('/',users.all)
    .get('/:id',users.findOne)
    ;

module.exports = router;