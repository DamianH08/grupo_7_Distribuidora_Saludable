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
        res.render('products/productDetail',{
            product:products_db.findById(req.params.id),
            categories:categories_db.all()
        }
        )
    },
    categories: (req,res) =>{
        res.render('products/allCategories',{
            categories:categories_db.data
        })
    },
    category: (req,res)=>{
        res.render('products/category',{
            categoryName:categories_db.findById(req.params.cat),
            categories:categories_db.data,
            products:products_db.findByCategory(req.params.cat),
        });
        // res.send(products);
    }
};