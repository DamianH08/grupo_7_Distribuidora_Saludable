const products_db = require('../db/products_db');
const categories_db = require('../db/categories_db');
const {user,variant,product,category,variantTypes} = require('../database/models');
const {Op} = require('sequelize');

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
        console.log(req.params.id)
        try{
            let myProduct = await product.findByPk(req.params.id,{
                attributes:['id','name','image'],
                include:{model:variant,attributes:['id','name','price']}
            })
            res.render('admin/products/showProduct',{
                product:myProduct
            })
        }catch(e){res.send(e)}
    },
    createProduct: async(req,res)=>{
        try{
            res.render('admin/products/createProduct',{
                categories:await category.findAll(),
                variantTypes:await variantTypes.findAll()
            })
        }catch(e){
            res.send(e)
        }
    },
    storeProduct: async(req,res)=>{
        // console.log(req.body)
        // let newProduct = products_db.createProduct(
        //     req.body.name,
        //     req.body.price,
        //     req.body.quantity,
        //     req.body.unit,
        //     req.body.image,
        //     req.body.category
        // );
        // res.redirect(`/admin/products/${newProduct}`);
        let id;
        console.log(JSON.parse(req.body))
        try{
            let newProduct = await product.create({
                name:req.body.name,
                image:req.body.image,
                category_id:req.body.category
            })
            id=newProduct.id
        }catch(e){res.send('error 1')}
        let variantName = await variantTypes.findOne({where:{id:parseInt(req.body.variant)}});
        console.log(variantName)
        try{
            await variant.create({
                product_id: id,
                name: variantName.name,
                price: req.body.price
            })
            res.redirect(`/admin/products/${newProduct.id}`)
        }catch(e){res.send(newProduct)}
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
    deleteProduct:async(req,res)=>{
        res.render('admin/products/deleteProduct',{
            product : await product.findOne({where:{id:req.params.id},include:variant})
        });
    },
    storeDeletedProduct:async(req,res)=>{
        try{
            console.log(`param: ${req.params.id}`)
            await product.destroy({where:{id:req.params.id},include:variant})
            res.redirect('/admin/products')
        }catch(e){
            res.send(e)
        }
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
    },
    deleteUser:async(req,res)=>{
        try{
            user.destroy({
                where:{
                    id:req.params.id
                }
            })
        }catch(e){
            res.send(e)
        }
        res.json({message:'El usuario se a borrado exitosamente'})
        
    }
    
}
