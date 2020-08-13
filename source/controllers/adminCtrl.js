const products_db = require('../db/products_db');
const categories_db = require('../db/categories_db');

module.exports = {
    index:(req,res)=>{
        res.render('admin/index')
    },
    showProducts:(req,res)=>{
        res.render('admin/products/products',{
          keyword:req.query.keyword,
          products:products_db.findByKeyword(req.query.keyword)  
        })
    },
    showProduct: (req,res)=>{
        res.render('admin/products/showProduct',{
            product:products_db.findById(req.params.id)
        })
    },
    createProduct:(req,res)=>{
        res.render('admin/products/createProduct',{
            categories:categories_db.data
        })
    },
    storeProduct:(req,res)=>{
        products_db.createProduct(
            req.body.name,
            req.body.price,
            req.body.quantity,
            req.body.unit,
            req.body.image,
            req.body.category
        );
        res.send('product created')
    },
    editProduct:(req,res)=>{
        res.render('admin/products/editProduct',{
            product:products_db.findById(req.params.id)
        })       
    }

}