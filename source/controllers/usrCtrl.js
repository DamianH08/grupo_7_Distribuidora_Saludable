const 
    categories_db = require("../db/categories_db"),
    { check, validationResult, body } = require('express-validator'),
    { Op } = require('sequelize'),
    {user}  = require('../database/models/'),
    fs = require('fs'),
    path = require('path'),
    bcrypt = require('bcryptjs'),
    hash = bcrypt.genSalt(10),
    crypto = require('crypto'),
    tokenStorage = require('../db/userTokens')
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
                            req.session.user = user.first_name;
                            if(req.body.remember=='on'){
                                const token = crypto.randomBytes(64).toString('base64');
                                tokenStorage.new(token,user.id,user.first_name);
                                res.cookie('userToken',token,{maxAge:1000*60*60}) // 1 hora
                                res.cookie('userName',user.first_name,{maxAge:1000*60*60})
                                req.session.userName = user.first_name;
                            }else{
                                req.session.userName = user.first_name;
                            }                            
                            res.redirect('/')
                        }else{
                            res.render('users/login',{
                                errorMessage:'Revisá los datos ingresados',
                                email:req.body.email
                            })                
                        }
                    })
                    .catch(error=>console.log(error))
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

    
    register: (req,res, next)=>{      
        let errors = validationResult(req);
        if(errors.isEmpty()){
            
            let user = {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.files[0].filename
            }
            
            
            //utilizo método de guardado en JSON --- REEMPLAZAR POR GUARDADO EN BASE DE DATOS
            
            let usersFile = fs.readFileSync('./db/users/users2.json', {encoding: 'utf-8'});
            let users = [];
            if (usersFile != ''){
                users = JSON.parse(usersFile);
            }
            
            users.push(user);
            let usersJSON = JSON.stringify(users);

            fs.writeFileSync('./db/users/users2.json',usersJSON);

            
            //Es sólo para controlar los datos y leer la contraseña sin hashear
            let userControl = {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,  
                password: req.body.password  
              }
                                    
            let usersFileControl = fs.readFileSync('./db/users/usersControl.json', {encoding: 'utf-8'});
            let usersControl = [];
            if (usersFileControl != ''){
                usersControl = JSON.parse(usersFileControl);
            }
            
            usersControl.push(userControl);
            let usersJSONControl = JSON.stringify(usersControl);

            fs.writeFileSync('./db/users/usersControl.json',usersJSONControl);
            // *************************  //
 
            // Guardado en Base de datos: REVISAR CAMPOS AL CREAR LA BASE
            // *********************************************
            // db.Users.create({
            //    name: req.body.name,
            //    surname: req.body.surname,
            //    email: req.body.email,
            //    password: bcrypt.hashSync(req.body.password, 10),
            //    avatar: req.files[0].filename
            //  
            //  })


            res.send('Se guardó OK, PASAR A VISTA LOGEADO');

        }else{
            
           return res.render('users/register',{ 
               errors: errors.errors,
               name: req.body.name,
               surname: req.body.surname, 
               email: req.body.email, })

        }
    },

    test:(req,res)=>{
        if(req.query.id){
            user.findByPk(req.query.id)
                .then(e=>res.send(e))
        }
        // if(req.query.name){
        //     user.findOne({
        //         where:{
        //             email:req.query.name
        //         }
        //     })
        //     .then(e=>res.send(e))
        // }

        // user.findAll()
        //     .then(a=>res.send(a))
        //     .catch(e=>console.log(e))
    },
    cart:(req,res)=>{
        res.render('users/cart',{
            categories:categories_db.data
        })
    },
    logout:(req,res)=>{
        req.session.destroy();
        res.clearCookie('userToken');
        res.clearCookie('userName');
        res.redirect('/')
    }
};