const path = require('path'),
      fs = require('fs');

let file = fs.readFileSync(path.join(__dirname,'products.json'),'utf-8');
let data = JSON.parse(file);

let t = data[0];
console.log(t.id.slice(0,3).toLowerCase());

module.exports = {
    all:()=>data,
    findByCategory: (category)=>{
        let products = data.filter(product => 
            product.id.slice(0,3).toLowerCase()==category.toLowerCase()
            );
        return products;
    },
    findById: (id)=>{
        return data.filter(prd => prd.id == id)[0]
    },
    findByKeyword:(keyword)=>{
        return data.filter(
            prd => prd.producto.toLowerCase().includes(keyword.toLowerCase()))
    }
}