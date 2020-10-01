const loggedUsers = require('../middlewares/loggedUsers');

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
          cb(null, './static/tmp/myUploads')
        },
        filename: function (req, file, cb) {
          cb(null, req.body.first_name + '-' + Date.now() + path.extname(file.originalname))}
      });
       
var upload = multer({ storage: storage });

router
    .get('/',(req,res)=>res.redirect('/login'))
    .get('/cart',userCtrl.cart)
    .get('/register',userCtrl.showRegisterForm)
    .post('/register',upload.any(), validate.registerForm, userCtrl.register)

    .get('/test',userCtrl.test)
    .get('/profile', userCtrl.showUser)

    .get('/profile/edit', userCtrl.editUser)
    .post('/profile/edit', upload.any(),validate.registerForm, userCtrl.updateUser)

    ;

module.exports = router;
    