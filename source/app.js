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
    loginRouter = require('./routes/userRouter'),
    indexRouter = require('./routes/indexRouter');
const { urlencoded } = require('express');
app
    .use('/products',productRouter)
    .use('/login',loginRouter)
    .use('/admin',adminRouter)
    .use('/',indexRouter);

// Run app
app.listen(port,()=>{
    console.log(`Server running on localhost:${port}`)
});