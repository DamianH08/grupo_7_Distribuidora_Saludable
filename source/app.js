const express = require('express');
const path = require('path');

const session = require('express-session');
const coockieParser = require('cookie-parser');

const app = express();
const port = 5000;

// Serve static files
app.use(express.static(path.join(__dirname,'static')));

// View engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// Populate req.body
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
const
    adminRouter = require('./routes/adminRouter'),
    productRouter = require('./routes/productRouter'),
    userRouter = require('./routes/userRouter'),
    indexRouter = require('./routes/indexRouter');

app
    .use('/',indexRouter)
    .use('/products',productRouter)
    .use('/users',userRouter)
    .use('/admin',adminRouter)
    ;

//api Routes
app.use('/api/v1/products',require('./api/routes/productsRouteApi'));


//Error 404
app.use((req,res,next)=>{
    res.status('404').render('404');
    next();
});

// Run app
app.listen(port,()=>{
    console.log(`Server running on localhost:${port}`)
});