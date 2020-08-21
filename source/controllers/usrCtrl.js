const categories_db = require("../db/categories_db");

module.exports ={
    showLoginForm: (req,res)=>{
        res.render('users/login')
    },
    cart:(req,res)=>{
        res.render('users/cart',{
            categories:categories_db.data
        })
    },
    login:(req,res)=>{
        res.send(req.body)
    },
    showRegisterForm: (req,res)=>{
        res.render('users/register')
    },
    register: (req,res)=>{
        res.send(req.body)
    }
};