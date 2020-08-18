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
    },
    createProduct:(name,price,qty,unit,image,category)=>{
        let id = generateId(category);
        let newProduct = {
            'id':id,
            'producto':name,
            'variante':qty+' '+unit,
            'precio':price,
            'img':image
        };
        data.push(newProduct);
        console.log(data[data.length-1]);
        fs.writeFileSync('db/products.json',JSON.stringify(data,null,2),(err)=>{
            if(err){console.log(err)}
        });
        return id;
    },
    storeEditedProduct:(id,name,price,img)=>{
        for(let product of data){
            if(product.id==id){
                product.producto=name;
                product.precio=price;
                product.img=img;
                console.log(`The following product has been edited:`);
                console.log(product);
                break;
            }
        }
        fs.writeFileSync('db/products.json',JSON.stringify(data,null,2),(err)=>{
            if(err){console.log(err)}
        });
    },
    storeDeletedProduct:(id)=>{
        let i=0;
        for(i;i<data.length-1;i++){
            if(id == data[i].id ){break}
        }
        data.splice(i,1);
        fs.writeFileSync('db/products.json',JSON.stringify(data,null,2),(err)=>{
            if(err){console.log(err)}
        });
    }
}