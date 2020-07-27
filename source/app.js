const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

// Serve static files
app.use(express.static(path.join(__dirname,'static')));

// Routes
app.get('/',(req,res)=>{
    res.sendFile(
        path.join(__dirname,'views','index.html')
    )
});
app.get('/login',(req,res)=>{
    res.sendFile(
        path.join(__dirname,'views','login.html')
    )
});
app.get('/carrito',(req,res)=>{
    res.sendFile(
        path.join(__dirname,'views','carrito.html')
    )
});
app.get('/test',(req,res)=>{
    res.sendFile(
        path.join(__dirname,'views','test.html')
    )
});
app.get('/register',(req,res)=>{
    res.sendFile(
        path.join(__dirname,'views','register.html')
    )
});
app.get('/productDetail',(req,res)=>{
    res.sendFile(
        path.join(__dirname,'views','productDetail.html')
    )
});
app.get('/cart',(req,res)=>{
    res.sendFile(
        path.join(__dirname,'views','cart.html')
    )
});


// Run app
app.listen(port,()=>{
    console.log(`Server running at localhost:${port}`)
});
