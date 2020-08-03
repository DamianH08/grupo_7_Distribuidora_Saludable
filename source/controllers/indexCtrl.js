module.exports ={
    index: (req,res)=>{
        res.render('index')
    },
    locales: (req,res)=>{
        res.render('locales')
    },
    about: (req,res)=>{
        res.render('about')
    },
    test:(req,res)=>{
        res.render('test')
    },
    cart:(req,res)=>{
        res.render('cart')
    },
    productDetail:(req,res)=>{
        res.render('productDetail')
    }
};


