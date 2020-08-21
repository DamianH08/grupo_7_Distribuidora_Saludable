const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

// Serve static files
app.use(express.static(path.join(__dirname,'static')));

// View engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//POST request
app.use(express.urlencoded({extended:false}));

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

//Error 404
app.use((req,res,next)=>{
    res.status('404').render('404');
    next();
});

// Run app
app.listen(port,()=>{
    console.log(`Server running on localhost:${port}`)
});