const 
    categories_db = require("../db/categories_db"),
    { check, validationResult, body } = require('express-validator'),
    { Op } = require('sequelize'),
    {user}  = require('../database/models/'),
    fs = require('fs'),
    path = require('path'),
    bcrypt = require('bcryptjs'),
    hash = bcrypt.genSalt(10)
    ;

module.exports ={
    showRegisterForm: (req,res)=>{
        res.render('users/register',{
            errorMessage:'',
            first_name:'',
            last_name:'',
            email:''
        })
    },
    register: (req,res, next)=>{      
        let errors = validationResult(req);
        if (errors.isEmpty()){      
            user.create({
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password,10),
                avatar: req.files[0].filename
            })
            .then(newUser=>{
                res.redirect('/login');
            })
            .catch(e => {
                res.locals.first_name = req.body.first_name;
                res.locals.last_name = req.body.last_name;
                res.locals.email = req.body.email;

                if(e.name=="SequelizeUniqueConstraintError"){
                    res.render('users/register',{
                        errorMessage:"El email ya se ancuentra registrado",
                    })
                }
            })


        }else{
            
           return res.render('users/register',{ 
               errors: errors.errors,
               first_name: req.body.first_name,
               last_name: req.body.last_name, 
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