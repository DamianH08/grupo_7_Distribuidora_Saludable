const tokens = require('../db/userTokens');

module.exports = {
    isLogged : (req,res,next) =>{
        if(req.session.userName){ //si hay una session abierta
            res.locals.user = req.session.user;
            res.locals.userId = req.session.userId;
         

        }else if(req.cookies.userToken){ //si no hay session pero hay una cookie con token
            let oldToken = tokens.find(req.cookies.userToken)[0];
            if(oldToken!=undefined){ //si el token esta en la base de datos
                res.locals.user = oldToken.user;
                req.session.user = oldToken.user;
                res.locals.userId = 54;        //CAMBIAR ESTE USERID!!!!!!!!!!!!!!!!!!!! 
            }
        }
        next();        
    },
    isAdmin: (req,res,next)=>{
        req.session.admin = true;
        req.session.user = 'Neo';
        if(req.session.admin){
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

    },
    isUser:(req,res,next) => {
        if (parseInt(req.params.id) === res.locals.userId ){
            next()
        } else {
            res.send('No podes mirar otro usuario!')
        }
    }
}