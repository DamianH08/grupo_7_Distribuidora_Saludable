const 
    categories_db = require("../db/categories_db"),
    { validationResult } = require('express-validator')
    ;

module.exports ={
    showLoginForm: (req,res)=>{
        res.render('users/login',
        {
            errorMessage:'',
        })
    },
    cart:(req,res)=>{
        res.render('users/cart',{
            categories:categories_db.data
        })
    },
    login:(req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            res.send('ok')
        }else{
            res.render('users/login',{
                errorMessage:'Verificar datos ingresados',
                email:req.body.email
            })
        }
    },
    showRegisterForm: (req,res)=>{
        res.render('users/register',{
            errorMessage:'',
            name:'',
            surname:'',
            email:''
        })
    },
    register: (req,res)=>{
        let errors = validationResult(req);
        console.log(errors);
        if(errors.isEmpty()){
            res.send('ok')
        }else{
            res.render('users/register',{
                errorMessage:'verificar datos ingresados',
                name: (req.body.name.length==0)? '':req.body.name,
                surname: (req.body.surname.length==0)? '':req.body.surname, 
                email: (req.body.email.length==0)? '':req.body.email,
        })
        }
    }
};