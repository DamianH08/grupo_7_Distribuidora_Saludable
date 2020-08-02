const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

// Serve static files
app.use(express.static(path.join(__dirname,'static')));

// View engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// Routes
const indexRouter = require('./routes/indexRouter');
app.use('/',indexRouter);
const loginRouter = require('./routes/loginRouter');
app.use('/',loginRouter);

// Run app
app.listen(port,()=>{
    console.log(`Server running on localhost:${port}`)
});
