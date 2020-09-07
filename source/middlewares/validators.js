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
        check('name')
            .notEmpty().withMessage('El campo Nombre no puede estar vacio.'),
        check('surname')
            .notEmpty().withMessage('El campo Apellido no puede estar vacio.'),
        check('email')
            .notEmpty().withMessage('El campo Email no puede estar vacio.').bail()
            .isEmail().withMessage('El Email debe ser una dirección válida.'),
        check('password')
            .notEmpty().withMessage('El campo Contraseña no puede estar vacio.').bail()
            .isLength({min:5}).withMessage('La Contaseña debe tener al menos 5 caracteres.')
    ]
}