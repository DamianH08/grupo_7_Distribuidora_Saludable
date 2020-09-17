const 
    categories_db = require("../db/categories_db"),
    { check, validationResult, body } = require('express-validator'),
    { Op } = require('sequelize'),
    {user,store,product,category,sessionToken}  = require('../database/models/'),
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
        let foto;   
            if(req.files[0]){
                foto = req.files[0].filename;
            }
            user.create({
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password,10),
                avatar: foto   
                
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
                res.render('users/register')
            })
        }
        else{
           return res.render('users/register',{ 
               errors: errors.mapped(),
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
        user.findAll({
            attributes:['id','first_name','last_name','email']
        })
        .then(results => res.send(results))
        .catch(e => console.log(e))
    }
};