window.addEventListener('load', function() {
    let errors = {};

    //variables declaradas para cada elemento del formulario
    let form = document.getElementById('userCreateForm');
    let first_name = document.getElementById('first_name');
    let last_name = document.getElementById('last_name');   
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let password2 = document.getElementById('password2');

    //Funciones para validar cada campo
    let validateFirstName = function() {
        let error = '';
        
        if (validator.isEmpty(first_name.value, { ignore_whitespace:true })) {
            error = 'Por js: El campo Nombre no puede estar vacio.';
        } 

        handleError(first_name, error);
    };

    let validateLastName = function() {
        let error = '';
        
        if (validator.isEmpty(last_name.value, { ignore_whitespace:true })) {
            error = 'Por js: El campo Apellido no puede estar vacio.';
        } 

        handleError(last_name, error);
    };

    let validateEmail = function() {
        let error = '';
        
        if (validator.isEmpty(email.value, { ignore_whitespace:true })) {
            error = 'Por js: El campo email no puede estar vacio.';
            
        } else if (!validator.isEmail(email.value)) {
                error = 'Por js: El Email debe ser una dirección válida.';
            }
        

        handleError(email, error);
    };

    let validatePassword = function() {
        let error = '';
        
        if (validator.isEmpty(password.value, { ignore_whitespace:true })) {
            error = 'Por js: El campo Contraseña no puede estar vacio.';
            
        } else if (!validator.isLength(password.value, { min: 5 })) {
                error = 'Por js: La Contaseña debe tener al menos 5 caracteres.';
            }

        handleError(password, error);
    };

    let validatePassword2 = function() {
        let error = '';
        
        if (password2.value != password.value) {
            error = 'Por js: Ambas contraseñas deben coincidir.';
            
        } 

        handleError(password2, error);
    };

    let handleError = function (element, error) {
        let errorElement = document.getElementById('error' + element.name);

        if (error) {
            element.classList.add('errorMessage');
            errorElement.classList.add('errorMessage');
            errors[element.name] = error;
        } else {
            element.classList.remove('errorMessage');
            errorElement.classList.remove('errorMessage');
            delete errors[element.name];
        }
        
        errorElement.innerText = error;
    };

    //llamados
    first_name.addEventListener('blur', validateFirstName);
    last_name.addEventListener('blur', validateLastName);
    email.addEventListener('blur', validateEmail);
    password.addEventListener('blur', validatePassword);
    password2.addEventListener('blur', validatePassword2);
    
    //no se envia si hay errores
    form.addEventListener('submit', function (event) {

        validateFirstName();
        validateLastName();
        validateEmail();
        validatePassword();
        validatePassword2();

        // Si hay errores no enviamos el formulario
        // https://stackoverflow.com/questions/126100/how-to-efficiently-count-the-number-of-keys-properties-of-an-object-in-javascrip
        if (Object.keys(errors).length) {
            event.preventDefault();
        }
    });


});