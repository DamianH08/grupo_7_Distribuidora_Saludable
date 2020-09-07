const 
    express = require('express'),
    router = express.Router(),
    userCtrl = require('../controllers/usrCtrl'),
    validate = require('../middlewares/validators'),
    multer = require ('multer'),
    path = require ('path')
    ;

var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './tmp/myUploads')
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + req.body.name + '-' + Date.now() + path.extname(file.originalname))}
      });
       
var upload = multer({ storage: storage });

router
    .get('/',(req,res)=>res.redirect('/users/login'))
    .get('/cart',userCtrl.cart)
    .get('/login',userCtrl.showLoginForm)
    .post('/login',validate.loginForm,userCtrl.authUser)
    .get('/register',userCtrl.showRegisterForm)
    .post('/register',upload.any(), validate.registerForm,userCtrl.register)
    .get('/test',userCtrl.test)
    .get('/user',(req,res)=>{res.render('users/user')})
    .get('/logout',userCtrl.logout)
    ;

module.exports = router;
    