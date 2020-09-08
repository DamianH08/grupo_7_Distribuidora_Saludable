const 
    categories_db = require("../db/categories_db"),
    products_db = require("../db/products_db"),
    { check, validationResult, body } = require('express-validator'),
    bcrypt = require('bcryptjs'),
    hash = bcrypt.genSalt(10),
    crypto = require('crypto'),
    tokenStorage = require('../db/userTokens'),
    {user}  = require('../database/models/')
    ;

module.exports ={
    index: (req,res)=>{
        let categories = categories_db.data;
        res.render('index',{
            categories:categories
        })
    },
    locales: (req,res)=>{
        res.render('about/locales',{
            categories:categories_db.data
        })
    },
    about: (req,res)=>{
        res.render('about/about',{
            categories:categories_db.data
        })
    },
    cart:(req,res)=>{
        res.render('cart',{
            categories:categories_db.data
        })
    },
    productDetail:(req,res)=>{
        res.render('productDetail')
    },
    search:(req,res)=>{
        res.render('search',{
            categories:categories_db.data,
            keyword:req.query.keyword,
            products:products_db.findByKeyword(req.query.keyword)
        })
    },
    login:(req,res)=>{
        res.render('login')
    },
    authUser:(req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            user.findOne({ where:{email:req.body.email} })
            .then(user=>{
                bcrypt.compare(req.body.password,user.password)
                    .then(isValidPassword=>{
                        if(isValidPassword && user.role=='admin'){
                            req.session.user = user.first_name;
                            req.session.admin = 'yes';
                            if(req.body.remember=='on'){
                                const token = crypto.randomBytes(64).toString('base64');
                                tokenStorage.new(token,user.id,user.first_name,user.role);
                                res.cookie('userToken',token,{maxAge:1000*60*60}) // 1 hora
                                res.cookie('userName',user.first_name,{maxAge:1000*60*60})
                            }
                            res.redirect('/admin');
                        }else if(isValidPassword){
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
                            res.render('/login',{
                                errorMessage:'Revisá los datos ingresados',
                                email:req.body.email
                            })                
                        }
                    })
                    .catch(error=>console.log(error))
            })
            .catch(()=>{
                res.render('/login',{
                    errorMessage:'Revisá los datos ingresados',
                    email:req.body.email
                })
            })
        }else{
            res.render('/login',{
                errorMessage:'Revisá los datos ingresados',
                email:req.body.email
            })
        }
    },
    logout:(req,res)=>{
        req.session.destroy();
        res.clearCookie('userToken');
        res.clearCookie('userName');
        res.redirect('/')
    }
};


