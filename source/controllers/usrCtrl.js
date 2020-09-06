const 
    categories_db = require("../db/categories_db"),
    { check, validationResult, body } = require('express-validator'),
    { Op } = require('sequelize'),
    {user}  = require('../database/models/'),
    bcrypt = require('bcryptjs'),
    hash = bcrypt.genSalt(10)
    ;

module.exports ={
    showLoginForm: (req,res)=>{
        res.render('users/login',
        {
            errorMessage:'',
        })
    },
    authUser:(req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            user.findOne({ where:{email:req.body.email} })
            .then(user=>{
                bcrypt.compare(req.body.password,user.password)
                    .then(isValidPassword=>{
                        if(isValidPassword){
                            res.send('ok')
                        }else{
                            res.render('users/login',{
                                errorMessage:'Revisá los datos ingresados',
                                email:req.body.email
                            })                
                        }
                    })
                    .catch(error=>console.log('hubo un erros'))
            })
            .catch(()=>{
                res.render('users/login',{
                    errorMessage:'Revisá los datos ingresados',
                    email:req.body.email
                })
            })
        }else{
            res.render('users/login',{
                errorMessage:'Revisá los datos ingresados',
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
        if(errors.isEmpty()){
            res.send('OK REGISTRADO')
        }else{
           return res.render('users/register',{ 
               errors: errors.errors,
               name: (req.body.name.length==0)? '':req.body.name,
               surname: (req.body.surname.length==0)? '':req.body.surname, 
               email: (req.body.email.length==0)? '':req.body.email, })
        }
    },
    test:(req,res)=>{
        if(req.query.id){
            user.findByPk(req.query.id)
                .then(e=>res.send(e))
        }
        if(req.query.name){
            user.findOne({
                where:{
                    email:req.query.name
                }
            })
            .then(e=>res.send(e))
        }

        // user.findAll()
        //     .then(a=>res.send(a))
        //     .catch(e=>console.log(e))
    },
    cart:(req,res)=>{
        res.render('users/cart',{
            categories:categories_db.data
        })
    }
};