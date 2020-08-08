const fs = require('fs');
const path = require('path');

const products_db = require('../db/products_db');
const categories_db = require('../db/categories_db');

module.exports ={
    index: (req,res)=>{
        res.render('products/products',{
            products:products_db.all(),
            categories:categories_db.data
        })
    },
    detail: (req,res)=>{
    },
    categories: (req,res) =>{
        res.send(
            categories_db.all()
        );
    },
    category: (req,res)=>{
        let products = categories_db.findByCategory(req.params.cat);
        res.send(products);
    }
};