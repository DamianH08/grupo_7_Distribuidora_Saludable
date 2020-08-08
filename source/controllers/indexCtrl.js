const categories_db = require("../db/categories_db");

module.exports ={
    index: (req,res)=>{
        let categories = categories_db.data;
        res.render('index',{
            categories:categories
        })
    },
    locales: (req,res)=>{
        res.render('locales')
    },
    about: (req,res)=>{
        res.render('about')
    },
    test:(req,res)=>{
        res.render('test')
    },
    cart:(req,res)=>{
        res.render('cart')
    },
    productDetail:(req,res)=>{
        res.render('productDetail')
    }
};


