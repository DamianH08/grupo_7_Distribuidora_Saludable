const sequelize = require('sequelize');

const {product,variant,category} = require('../../database/models');

module.exports={
    all: async(req,res) =>{
        // Extraer por categorias
        console.log(`executing  ${req.query}...`)
        console.log(`cat=${req.query.cat}  limit:${req.query.limit}  page=${req.query.page}`)
        if(req.query.cat){
            try{
                let products = await product.findAll({
                    where:{ 
                        category_id:req.query.cat
                    },
                    attributes:['id','name','image'],
                    include:{model:variant, attributes:['id','name','price']},
                    limit: parseInt(req.query.limit),
                    offset: (parseInt(req.query.page)-1)*parseInt(req.query.limit)
                })
                let categoryName= await category.findByPk(req.query.cat);
                let totalItems= await product.findAndCountAll({
                    where:{category_id:req.query.cat}
                });
                console.log('total items: '+totalItems.count)
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
                    limit: parseInt(req.query.limit),
                    offset: parseInt(req.query.page)*parseInt(req.query.limit)
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
    one:async(req,res)=>{
        product.findByPk(req.params.id,{
            attributes:['id','name'],
            include:{model:variant,attributes:['id','name','price']}
        })
        .then(product=>{
            res.json(product)
        })
        .catch(e => sendError(e))
    },
    create:(req,res)=>{

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
    }
}