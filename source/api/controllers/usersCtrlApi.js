const { query } = require('express');
const sequelize = require('sequelize');
const {Op} = require('sequelize');
const {user} = require('../../database/models');

module.exports = {
    all:async(req,res)=>{
        let users;

        //traer los ultimos registrados
        if(req.query.last){
            try{
                let users = await user.findAll({
                    attributes:['id','first_name','last_name','email','role','avatar'],
                    order:[['created_at','desc']],
                    limit:5
                })
                res.json(users)
            }catch(e){res.json(e)}
        }

        //traer todos los users
        //o filtrar por keyword
        if(req.query.keyword){
            console.log(req.query.keyword)
            users = await user.findAll({
                where:{
                    first_name:{ [Op.like]:`%${req.query.keyword}%`},
                }
            })
            users.push(
                await user.findAll({
                    where:{
                        last_name:{ [Op.like]:`%${req.query.keyword}%`},
                    }
                })  
            )
        }else{
            users = await user.findAndCountAll({
                attributes:['id','first_name','last_name','email','role','avatar']
            })
        }
        res.json(users)
    },
    search:async(req,res)=>{
        let userResult = user.findAndCountAll({
            where:{
                first_name:{ [Op.like]:`%${req.query.keyword}%`},
                last_name:{ [Op.like]:`%${req.query.keyword}%`},
                email:{ [Op.like]:`%${req.query.keyword}%`}
            }
        })
        res.json(userResult)
    },
    findOne:async(req,res)=>{
        try{
            let myUser = await user.findByPk(req.params.id,{
                attributes:['id','first_name','last_name','email','role']
            })
            res.json(myUser)
        }catch(e){res.send(e)}
    },
    delete:async(req,res)=>{
        try{ 
            user.destroy({
                where:{id:req.params.id}
            })
            res.json({status:'deleted',id:req.params.id})
        }catch(e){res.json({status:'error'})}
    },
    update:async(req,res)=>{
        try{
            let oldUser = await user.findByPk(req.params.id)
            console.log(oldUser)
            user.update(
                {
                    first_name:req.body.fname || oldUser.first_name,
                    last_name:req.body.lname || oldUser.last_name,
                    email:req.body.email || oldUser.email,
                    password:req.body.password || oldUser.password
                },
                {where:{id:req.params.id}}
            )
            let updatedUser = user.findByPk(req.params.id)

            res.json({status:'ok',url:`/users/${req.params.id}`})
        }catch(e){res.send(e)}
    },
    islogged:(req,res)=>{
        if(req.session.user){
            res.json({status:'logged'})
    }
        else{
            res.json({status:'notlogged'})
        }
    }
}