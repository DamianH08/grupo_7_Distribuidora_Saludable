const tokens = require('../db/userTokens');

module.exports = {
    isLogged : (req,res,next) =>{
        if(req.session.userName){ //si hay una session abierta
            res.locals.user = req.session.user;
        }else if(req.cookies.userToken){ //si no hay session pero hay una cookie con token
            let oldToken = tokens.find(req.cookies.userToken)[0];
            if(oldToken!=undefined){ //si el token esta en la base de datos
                res.locals.user = oldToken.user;
                req.session.user = oldToken.user;           
            }
        }
        next();        
    },
    isAdmin: (req,res,next)=>{
        console.log('session '+ req.session.admin)
        if(req.session){
            res.locals.user = req.session.user;
            next()
        }else if(req.cookies.token){
            let oldToken = tokens.find(req.cookies.userToken)[0];
            if(oldToken.role=='admin'){
                req.session.admin = true;
                res.locals.userName = req.cookies.userName;
                req.locals.user = oldToken.first_name;
                res.redirect('/admin');
            }
        } else{
            res.redirect('/login');
        }  

    }
}