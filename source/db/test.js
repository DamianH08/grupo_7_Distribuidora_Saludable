const path = require('path'),
      fs = require('fs');

let file = fs.readFileSync(path.join(__dirname,'products.json'),'utf-8');
let data = JSON.parse(file);


//this function generates a new id for each new product
function generateId(id){
    let ids=[]
    for(let product of data){
        if(product.id.slice(0,3)==id.toUpperCase()){
            ids.push(product.id)
        }
    }
    ids.sort();
    let newID =id+(parseInt(ids[ids.length-1].slice(3,6))+1);
    console.log(newID.toUpperCase())
    return newID.toUpperCase();
}
