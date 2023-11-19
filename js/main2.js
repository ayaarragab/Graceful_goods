let urlParams1 = new URLSearchParams(window.location.search);
let productId = urlParams1.get('id');

async function displayProduct(product_id) {
    const apiUrl = `https://fakestoreapi.com/products/${product_id}`;
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    const content = document.querySelector('.product-self');
    const htmlContent = `
    <div class="img-and-card">
        <div class="img-self">
            <img src="${jsonData.image}" alt="">
        </div>
        <div class="card price" style="width: 18rem;">
            <div class="card-body">
                <h4>Add to card</h4>
                <h5 class="card-title">$${jsonData.price}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">$${parseInt(jsonData.price) + 10}</h6>
                <p class="card-text">In stock</p>
                <a href="#" class="btn btn-primary" data-id="${jsonData.id}" onclick="window.location.href='cart.html'">Add to cart</a>
            </div>
        </div>
</div>
<div class="des">
    <h4>Description:</h4>
    <span>${jsonData.description}</span>
    <h4>Category:</h4>
    <span>${jsonData.category}</span>
    <h4>Rate:</h4>
    <span> ${jsonData.rating["rate"]}</span>
</div>
`

    content.innerHTML = htmlContent;
}

if(productId) {
    displayProduct(productId);
}
async function fetchCategories() {
    const apiUrl = 'https://fakestoreapi.com/products/categories';
    const response = await fetch(apiUrl);
    const categories = await response.json();

    const categoryElements = document.querySelectorAll('.me-3.categ .col-md-3');

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const h2Element = document.createElement('h2');
        h2Element.textContent = category;

        categoryElements[i].appendChild(h2Element);
    }
}
fetchCategories();
