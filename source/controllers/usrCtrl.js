const categories_db = require("../db/categories_db");

module.exports ={
    login: (req,res)=>{
        res.render('login')
    },
    register: (req,res)=>{
        res.render('register')
    }
};