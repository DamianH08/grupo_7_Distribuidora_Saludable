const express = require('express');
const path = require('path');
require('dotenv').config()

const session = require('express-session');
const coockieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname,'build')))
app.use(express.static(path.join(__dirname,'static')));

// View engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// Populate req.body
app.use(express.json())
app.use(express.urlencoded({extended:false}));

//Session and cookies
app.use(session({
    secret:"distribuidora saludable",
    resave:false,
    saveUninitialized:true
}));
app.use(coockieParser());

//este middleware verifica si hay un usuario logeado
const verify = require('./middlewares/loggedUsers');
app.use('*',verify.isLogged);
app.use('/admin',verify.isAdmin);

// Routes
const adminRouter = require('./routes/adminRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const indexRouter = require('./routes/indexRouter');
const loggedUsers = require('./middlewares/loggedUsers');

app.use('/',indexRouter);
app.use('/products',productRouter);
app.use('/users',userRouter);
app.use('/admin',adminRouter);

//api Routes
app.use('/api/v1/products',require('./api/routes/productsRouteApi'));
app.use('/api/v1/users',require('./api/routes/usersRouteApi'));

//Dashboard
app.get('/admin/dashboard',(req,res)=>res.sendFile(path.join(__dirname,'build','index2.html')))


//Error 404
app.use((req,res,next)=>{
    res.status('404').render('404');
    next();
});

// Run app
app.listen(port,()=>{
    console.log(`Server running on localhost:${port}`)
});