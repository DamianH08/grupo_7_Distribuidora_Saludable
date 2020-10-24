const sequelize = require('sequelize');
const {Op} = require('sequelize');
const {product,variant,category} = require('../../database/models');

module.exports={
    all:async(req,res) =>{

        let limit = req.query.limit? parseInt(req.query.limit):8
        let page = req.query.page? parseInt(req.query.page):1
        let cat = req.query.cat? parseInt(req.query.cat):undefined
        let keyword = req.query.keyword? req.query.keyword:undefined
        let order = req.query.order? req.query.order:undefined

        //Search by keyword
        if(keyword){
            try{
                let products = await product.findAll({
                    attributes:['id','name','image','updated_at'],
                    include:{model:variant, attributes:['id','name','price']},
                    where:{
                        name:{ [Op.like]:`%${keyword}%`}
                    }
                })
                res.json(products)
            }catch(e){res.json('Error')}
        }

        //Order By
        if(order){
            try{
                let products = await product.findAll({
                    attributes:['id','name','image'],
                    // include:{model:variant, attributes:['id','name','price']},
                    order:[['created_at','desc']],
                    limit:limit 
                })
                res.json(products)
            }catch(e){res.json(e)}
        }

        // Extraer por categorias
        if(cat!=undefined){
            try{
                let products = await product.findAll({
                    where:{ 
                        category_id:cat
                    },
                    attributes:['id','name','image'],
                    include:{model:variant, attributes:['id','name','price']},
                    limit: limit,
                    offset: (page-1)*limit
                })
                
                let categoryName= await category.findByPk(cat);
                // console.log(categoryName)
                
                let totalItems= await product.findAndCountAll({
                    where:{category_id:cat}
                });
                // console.log('total items: '+totalItems.count)
               
                res.json({
                    category:categoryName.name,
                    list:products,
                    total:totalItems.count
                })
            }catch(error){
                res.send(error)
                // res.json({message:'Hubo un error en la base de datos'})
            }    
        }else{
            try{
                let products = await product.findAll({
                    attributes:['id','name','image'],
                    include:{model:variant, attributes:['id','name','price']},
                    limit: limit,
                    offset: (page-1)*limit
                })
                res.json({
                    total: await product.count(),
                    rows:products
                })
            }catch(error){
                res.json({message:'Hubo un error en la base de datos'})
            }

        }

    },
    search:async(req,res) =>{
        let keyword = req.query.keyword || ''

        const products = await product.findAll({
            attributes:['id','name','image'],
            include:{model:variant, attributes:['id','name','price']},
            where:{
                name:{ [Op.like]:`%${keyword}%`}
            }
        })
        res.json(products)
    },
    one:async(req,res)=>{
        product.findByPk(req.params.id,{
            attributes:['id','name','image'],
            include:{model:variant,attributes:['id','name','price']}
        })
        .then(product=>{
            res.json(product)
        })
        .catch(e => sendError(e))
    },
    create:async(req,res)=>{
        console.log('body: '+req.body.name)
        console.log('body: '+req.body.description)
        console.log('body: '+req.body.category)
        console.log('body: '+req.body.image)
        console.log('body: '+req.body.variant)
        console.log('body: '+req.body.price)

        let id;
        try{
            let newProduct = await product.create({
                name:req.body.name,
                image:req.body.image,
                description:req.body.description,
                category_id:req.body.category
            })
            id=newProduct.id
        }catch(e){res.send(e)}
        try{
            await variant.create({
                product_id: id,
                name: req.body.variant,
                price: (req.body.price)
            })
        }catch(e){res.send(e)}

        let newProduct = await product.findByPk(id,{
            attributes:['id','name','description','image'],
            include:{model:variant,attributes:['id','name','price']}

        })
        res.json(newProduct)

    },
    edit:(req,res)=>{
    },
    delete:(req,res)=>{
        res.send('ok')
    },
    variantTypes:(req,res)=>{
        const variants = require('../../db/variantTypes')
        console.log('variants: '+variants)
        res.json(variants)
    },
    search:async(req,res)=>{
    },
    categories:async(req,res)=>{
        try{
            let categoryList = await category.findAndCountAll()
            console.log(categoryList)
            res.json(categoryList)
        }catch(e){res.json(e)}
    }
}