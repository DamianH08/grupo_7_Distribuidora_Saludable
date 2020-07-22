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
app.get('/bulma',(req,res)=>{
    res.sendFile(path.join(__dirname,'test','bulma','index.html'));
})

// Run app
app.listen(port,()=>{
    console.log(`Server running at localhost:${port}`)
});
