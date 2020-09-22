const products_db = require('../db/products_db');
const categories_db = require('../db/categories_db');
const {user,variant,product} = require('../database/models');
const {Op} = require('sequelize')

module.exports = {
    index:(req,res)=>{
        res.render('admin/index')
    },
    login:(req,res)=>{
        res.render('admin/login')
    },
    authAdmin:(req,res)=>{
        res.send('ok')
    },
    showProducts:(req,res)=>{
        if(req.query.keyword){
            // res.render('admin/products/products',{
            //   keyword:req.query.keyword,
            //   products:products_db.findByKeyword(req.query.keyword)  
            // })
            product.findAll({
                where:{
                    name:{ [Op.like]:`%${req.query.keyword}%` }
                },
                attributes: ['id','name']
            })
            .then(products =>{
                // console.log(products)
                // res.send(products)
                res.render('admin/products/products',{
                    keyword:req.query.keyword,
                    products
                })
            })
            .catch(e => res.send(e))
        }else{
            res.render('admin/products/products',{
                products:[]
            })
        }
    },
    showProduct: async(req,res)=>{
        res.render('admin/products/showProduct',{
            product : await product.findOne({
                where:{id:req.params.id}
            })
        })
    },
    createProduct:(req,res)=>{
        res.render('admin/products/createProduct',{
            categories:categories_db.data
        })
    },
    storeProduct:(req,res)=>{
        let newProduct = products_db.createProduct(
            req.body.name,
            req.body.price,
            req.body.quantity,
            req.body.unit,
            req.body.image,
            req.body.category
        );
        res.redirect(`/admin/products/${newProduct}`);
    },
    editProduct:async(req,res)=>{
        res.render('admin/products/editProduct',{
            product:await product.findOne({
                where:{
                    id:req.params.id
                },
                include:{model:variant, attributes:['id','name','price']}
            })
        })       
    },
    storeEditedProduct:(req,res)=>{
        products_db.storeEditedProduct(
            req.params.id,
            req.body.name,
            req.body.price,
            req.body.img
        );
        res.redirect(`/admin/products/${req.params.id}`);
    },
    deleteProduct:(req,res)=>{
        res.render('admin/products/deleteProduct',{
            product : products_db.findById(req.params.id)
        });
    },
    storeDeletedProduct:(req,res)=>{
        products_db.storeDeletedProduct(req.params.id);
        res.render('admin/products/deletedProduct');
    },
    users:(req,res)=>{
        user.findAll({
            attributes:['id','first_name','last_name','email']
        })
        .then(users =>{
            res.render('admin/users/users',{
                keyword:undefined,
                users:users
            })

        })
    }
    
}
