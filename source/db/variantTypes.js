const fs = require('fs')

let variantTypes = ['1 KG','1 L','1,25 KG','10 GR','10 KG','10 U','100 GR','100 ML','100 U','11,34 KG','110 GR','110 ML','12 U','12,5 KG','120 GR','120 ML','125 ML','15 KG','15 U','150 GR','160 GR','18 KG','18 U','180 GR','190 GR','2 KG','2,5 KG','20 GR','20 KG','20 U','200 GR','200 ML','21 GR','210 GR','22,68 KG','220 GR','230 GR','24 U','240 GR','25 GR','25 KG','250 GR','250 ML','270 GR','28 GR','280 GR','3 KG','3,4 KG','3,5 KG','30 GR','30 KG','300 GR','330 ML','333 ML','340 GR','35 GR','350 GR','350 ML','360 GR','360 ML','380 GR','4 KG','40 KG','40 U','400 GR','400 ML','430 GR','45 KG','450 ML','480 GR','490 GR','5 GR','5 KG','5 U','50 GR','500 GR','500 ML','6 KG','6 U','6,8 KG','60 GR','600 ML','660 ML','7 KG','70 GR','700 GR','74 GR','75 GR','750 ML','80 GR','9 KG','9 U','90 GR','950 GR','1U']
module.exports = variantTypes

let query='insert into variant_types (name) values';

variantTypes.forEach(variant=>{
    query += `('${variant}'),`
})

fs.writeFileSync('add_variant_types.sql',query,'utf-8')




