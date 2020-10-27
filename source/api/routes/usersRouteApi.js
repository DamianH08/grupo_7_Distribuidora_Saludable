const express = require('express');
const router = express.Router();
const users = require('../controllers/usersCtrlApi');

router
    .get('/',users.all)
    .get('/islogged',users.islogged)
    .get('/:id',users.findOne)
    .delete('/:id',users.delete)
    .patch('/:id',users.update)
    ;

module.exports = router;