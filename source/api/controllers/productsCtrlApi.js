const {product,variant} = require('../../database/models')

module.exports={
    all: async(req,res) =>{

        let limit = req.params.limit || 12;
        let offset = (limit * parseInt(req.query.page)) || 0 

        try{
            let products = await product.findAll({
                attributes:['id','name','image'],
                include:{model:variant, attributes:['id','name','price']},
                limit: limit,
                offset: offset
            })
            res.json({
                total: await product.count(),
                rows:products
            })
        }catch(error){
            res.json({message:'Hubo un error en la base de datos'})
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
        
    }
}