const path = require('path'),
      fs = require('fs');

let data = fs.readFileSync(path.join(__dirname,'categories.json'),'utf-8');
data = JSON.parse(data);

module.exports ={
    data,
    all: ()=>{
        let categories = data.map(cat => cat.name);
        return categories;
    },
    findById:(id)=>{
        let ctg = data.find(categ => categ.id.toLowerCase()==id.toLowerCase())
        return ctg.name
    }
}
