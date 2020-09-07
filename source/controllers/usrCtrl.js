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
    cart:(req,res)=>{
        res.render('users/cart',{
            categories:categories_db.data
        })
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
    }
};