//get querystring params to define pagination
let params = new URLSearchParams(location.search) // => '?page=n1&limit=n2';
let page = params.get('page') || 0;
let limit = params.get('limit') || 8;
let totalPages;

//boton de ver por paginas
let verBtn = document.getElementById('ver')
verBtn.addEventListener('change',function(){
    limit = this.value
    page=0
    loadData(page,limit)
})

//input de paginado
let actualPageInput = document.getElementById('actualPage')
let actPageSpan = document.getElementById('actPage')
let totalPagesSpan = document.getElementById('totalPages')

//cambiar paginado desde input 
// actualPageInput.addEventListener('change',function(pageValue){
//     loadData(pageValue,limit)
// })

loadData(page,limit)
let productsContainer = document.getElementById('productsContainer')

function loadData(page,limit){
    fetch(`http://localhost:5000/api/v1/products?page=${page}&limit=${limit}`)
        .then(data => data.json())
        .then(products => {
            cleanProductcontainer();
            for(let product of products.rows){
                addProductCard(product.id,product.name,product.image,product.variants[0].price)
            }
            addPaginationDetail(products.total)
        })
}

function cleanProductcontainer(){
    productsContainer.innerHTML=''
}

function addProductCard(id,name,image,price){
    productsContainer.innerHTML +=
    `<a class="to-product" href="/products/${id}">
        <div class="product-container add-shadow-1">
            <div class="image-product"><img class="photo-product" src="${image}"></div>
            <div class="price-product">$${price} </div>
            <div class="desc-product">${name.length>25?name.slice(0,25):name} </div>
            <a href="#" class="btn"><i class="fas fa-cart-arrow-down"></i> Agregar al carrito</a>
    </div>
    </a>`
}

//esta funcion carga los datos del paginado siguinte
function nextPage(){
    page++
    loadData(page,limit)
}

//esta funcion carga el paginado anterior
function previousPage(){
    page--
    loadData(page,limit)
}

//esta funcion agrega informacion del paginado en la vista
function addPaginationDetail(totalProducts){
    actPage.innerText = page+1
    totalPages = Math.floor(totalProducts/verBtn.value);
    totalPagesSpan.innerText = totalPages
    
}

