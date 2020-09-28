const 
    fs = require('fs'),
    path = require('path'),
    products_db = require('../db/products_db'),
    categories_db = require('../db/categories_db'),
    {product,variant,category} = require('../database/models')
    ;
const { Op } = require('sequelize');



module.exports ={
    index: async(req,res)=>{
    //     res.render('products/products',{
    //         products:products_db.all(),
    //         categories:categories_db.data
    //     })

        const products = await product.findAll({
            limit:8,
            attributes:['id','name','image'],
            include:{model:variant, attributes:['id','name','price']}
        })

        res.render('products/products',{
            products,
            categories: await category.findAll()
        })

    },
    search:async(req,res)=>{
        // res.send('ok')
        const products = await product.findAll({
            attributes:['id','name','image'],
            include:{model:variant, attributes:['id','name','price']},
            where:{
                name:{ [Op.like]:`%${req.query.keyword}%`}
            }
        })
        // res.send(products)
        res.render('search',{
            categories:await category.findAll(),
            keyword:req.query.keyword,
            products
        })
    },
    categories: async (req,res) =>{
        res.render('products/allCategories',{
            categories:await category.findAll()
        })
    },
    category: async (req,res)=>{
        // res.render('products/category',{
        //     categoryName:categories_db.findById(req.params.cat),
        //     categories:categories_db.data,
        //     products:products_db.findByCategory(req.params.cat),
        // });
        // let cat = await category.findByPk(req.params.cat)
        // let products= await product.findAll({
        //             attributes:['id','name','image'],
        //             include:{model:variant, attributes:['id','name','price']},
        //             where:{
        //                 category_id:req.params.cat
        //             }
        //         });
        // // res.send(products)
        // res.render('products/category',{
        //     categories: await category.findAll(),
        //     products: await product.findAll({
        //         attributes:['id','name','image'],
        //         include:{model:variant, attributes:['id','name','price']},
        //         where:{
        //             category_id:req.params.cat
        //         }
        //     }),
        //     categoryName:await category.findByPk(req.params.cat)
        // })
        res.render('products/category',{
            categories: await category.findAll(),
            categoryTitle: await category.findByPk(req.params.cat)
        })
    },
    showProduct: async(req,res)=>{
    //     if(products_db.findById(req.params.id)){
    //         res.render('products/productDetail',{
    //             product:products_db.findById(req.params.id),
    //             categories:categories_db.data
    //         }
    //         )
    //     }else{
    //         res.status('404').render('404')
    //     }
        // product.findByPk(req.params.id)
        // .then(product =>{
        //     console.log(product)
        //     res.send(product)
        // })
        const myProduct = await product.findByPk(req.params.id,{
            attributes:['id','name','image']
        })
        const myVariant = await variant.findAll({
            where:{ product_id:req.params.id },
            attributes:['id','name','price','stock']
        })
        // res.send(myVariant)
        res.render('products/productDetail',{
            product:myProduct,
            variants:myVariant,
            categories: await category.findAll()
        })
    }

};
