let price = document.getElementById('price')
let variants = document.getElementById('variants')
variants.addEventListener('change',function(){
    price.innerText='$'+variants.value
})