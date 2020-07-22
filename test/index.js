const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

/* static files */
app.use(express.static(path.join(__dirname,'static')));

/* view engine */
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


/* Routes */
app.get('/',(req,res)=>{
    res.render('index')
});
app.get('/login',(req,res)=>{
    res.render('login')
});


app.listen(port,
    console.log('server running at localhost:'+port));