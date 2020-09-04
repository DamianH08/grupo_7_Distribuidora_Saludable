const { check } = require('express-validator');

const loginMessage = "Verificá los datos ingresados"

module.exports = {
    loginForm : [
        check('email')
            .notEmpty().withMessage('Este campo no debe estar vacio')
            .isEmail().withMessage(loginMessage)
            ,
        check('password')
            .notEmpty().withMessage(loginMessage)
            .isLength({min:5}).withMessage(loginMessage)
    ],
    registerForm : [
        check('name').notEmpty(),
        check('surname').notEmpty(),
        check('email').notEmpty().isEmail(),
        check('password').notEmpty().isLength({min:5})
    ]
}