const path = require('path'),
      fs = require('fs');

let file = fs.readFileSync(path.join(__dirname,'userTokens.json'),'utf-8');
let tokens = JSON.parse(file);

module.exports = {
    find:(userToken)=>{
        return tokens.filter(item => item.token==userToken)
    },
    new:(userToken,userId,userName)=>{
        let newItem = {
            'token':userToken,
            'id':userId,
            'user':userName
        };
        tokens.push(newItem);
        fs.writeFileSync('db/userTokens.json',JSON.stringify(tokens,null,2),(err)=>{
            if(err){console.log(err)}
        });
    },
    storeDeletedProduct:(token)=>{
        let i=0;
        for(i;i<tokens.length-1;i++){
            if(token == tokens[i].token ){break}
        }
        tokens.splice(i,1);
        fs.writeFileSync('db/userTokens.json',JSON.stringify(data,null,2),(err)=>{
            if(err){console.log(err)}
        });
    }
}