const 
    express = require('express'),
    router = express.Router(),
    userCtrl = require('../controllers/usrCtrl'),
    validate = require('../middlewares/validators'),
    multer = require ('multer')
    ;

var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, '/tmp/my-uploads')
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(originalname))}
      });
       
var upload = multer({ storage: storage });

router
    .get('/',(req,res)=>res.redirect('/users/login'))
    .get('/cart',userCtrl.cart)
    .get('/login',userCtrl.showLoginForm)
    .post('/login',validate.loginForm,userCtrl.authUser)
    .get('/register',userCtrl.showRegisterForm)
    .post('/register',validate.registerForm,upload.any(),userCtrl.register)
    .get('/test',userCtrl.test)
    ;

module.exports = router;
    