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
                // avatar: foto   
                
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

    showUser: async (req,res)=>{
        console.log(req.session.userId)
             
        try{
            let usario = await user.findByPk(req.session.userId);

            res.render('users/user',{
                first_name: usario.first_name,
                last_name: usario.last_name,
                email: usario.email,
                avatar: usario.avatar,
            
                categories: await category.findAll() 
            });              
        
        }catch(error){
            res.send({message:'Hubo un error en la base de datos'})
        }

      
    },

    editUser: async (req,res)=>{
             
        try{
            let usario = await user.findByPk(req.session.userId);
            let categorias = await category.findAll();

            res.render('users/userEdit',{
                first_name: usario.first_name,
                last_name: usario.last_name,
                email: usario.email,
                avatar: usario.avatar,
            
                categories: categorias 
            });              
        
        }catch(error){
            res.send({message:'Hubo un error en la base de datos'})
        }

      
    },

    updateUser: (req,res,next)=>{

        console.log('LLEGO: session user: ' + req.session.user);
        console.log('LLEGO: session id: ' + req.session.userId);
    
        console.log('LLEGO: oldAvatar: ' + req.body.oldAvatar);
        console.log('LLEGO: first_name: '+ req.body.first_name);
        console.log('LLEGO: last_name: ' + req.body.last_name);
        console.log('LLEGO: email: ' + req.body.email);
        console.log('LLEGO: password: ' + req.body.password);
        console.log('LLEGO: avatar: ' +req.body.avatar);
    
       
        
     /*    
        let foto;

        if (req.body.avatar) {
            foto = req.body.avatar;
        } else if (req.body.oldAvatar) {
            foto = req.body.oldAvatar;
        }

        delete req.body.oldAvatar;

        user.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            avatar: foto,
        },{ where:{
            id: req.session.userId
        }
        })  

          

        res.redirect('/users/profile');              
        */

        res.send('Actualizado');
      
              
    },

    test:(req,res)=>{
        user.findAll({
            attributes:['id','first_name','last_name','email']
        })
        .then(results => res.send(results))
        .catch(e => console.log(e))
    }
};