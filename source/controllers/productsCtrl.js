const fs = require('fs');
const path = require('path');

let file = fs.readFileSync(path.join(__dirname,'../db/products.json'),'utf-8');
let products = JSON.parse(file);

module.exports ={
    index: (req,res)=>{
        res.render('products/products',{
            products:products
        })
    }
};