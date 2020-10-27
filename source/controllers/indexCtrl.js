const 
    categories_db = require("../db/categories_db"),
    products_db = require("../db/products_db"),
    { check, validationResult, body } = require('express-validator'),
    bcrypt = require('bcryptjs'),
    hash = bcrypt.genSalt(10),
    crypto = require('crypto'),
    tokenStorage = require('../db/userTokens'),
    {user,category,product,variant}  = require('../database/models/')
    ;

module.exports ={
    index: async(req,res)=>{
        // Se seleccionan categorias al azar para mostrar en la home
        let categories = await category.findAll()
        let catcopy = categories
        let starCategories = []
        for(let i=0;i<8;i++){
            let a = catcopy.pop(Math.floor(Math.random()*categories.length))
            starCategories.push(a)
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        try{
            let ofertas = await product.findAll({
                where:{section_id:1},
                attributes:['id','name','image'],
                include:{model:variant, attributes:['id','name','price']}
            })
            let destacados = await product.findAll({
                where:{section_id:2},
                attributes:['id','name','image'],
                include:{model:variant, attributes:['id','name','price']}
            })

            res.render('index',{
                categories,
                starCategories,
                ofertas,
                destacados
            })
        }catch(e){console.log(e)}
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
    cart:async(req,res)=>{
        res.render('cart',{
            categories:await category.all()
        })
    },
    productDetail:(req,res)=>{
        res.render('productDetail')
    },
    //este controlador paso a products
    // search:async(req,res)=>{
    //     res.render('search',{
    //         categories:categories_db.data,
    //         keyword:req.query.keyword,
    //         products:products_db.findByKeyword(req.query.keyword)
    //     })
    // },
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
                            req.session.admin = true;
                            if(req.body.remember=='on'){
                                const token = crypto.randomBytes(64).toString('base64');
                                tokenStorage.new(token,user.id,user.first_name,user.role);
                                res.cookie('userToken',token,{maxAge:1000*60*60}) // 1 hora
                                res.cookie('userName',user.first_name,{maxAge:1000*60*60})
                            }
                            res.redirect('/admin');
                        }else if(isValidPassword){
                            req.session.user = user.first_name;
                            req.session.userId = user.id;
                            if(req.body.remember=='on'){
                                const token = crypto.randomBytes(64).toString('base64');
                                tokenStorage.new(token,user.id,user.first_name);
                                res.cookie('userToken',token,{maxAge:1000*60*60}) // 1 hora
                                res.cookie('userName',user.first_name,{maxAge:1000*60*60})
                            }
                            
                           /* else{
                                req.session.userName = user.first_name;
                                req.session.userId = user.id;
                            }
                            
                            */

                            req.session.userName = user.first_name;
                            req.session.userId = user.id;                         
                            res.redirect('/')
                            
                        }else{
                            res.render('login',{
                                errorMessage:'Revisá los datos ingresados',
                                email:req.body.email
                            })                
                        }
                    })
                    .catch(error=>console.log(error))
            })
            .catch(()=>{
                res.render('login',{
                    errorMessage:'Revisá los datos ingresados',
                    email:req.body.email
                })
            })
        }else{
            console.log(errors)
            res.render('login',{
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


