const path = require('path'),
      fs = require('fs');

let file = fs.readFileSync(path.join(__dirname,'products.json'),'utf-8');
let products = JSON.parse(file);

module.exports = {
    all:()=>products,
    findByCategory: (cat)=>{
        
    }
}