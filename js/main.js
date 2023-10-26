async function fetchingProductsByCategory(category) {
    const apiUrl = `https://fakestoreapi.com/products/category/${category}`;
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    const content = document.querySelector('.products .carousel-inner');
    let htmlcontent = ``;

    const numProducts = jsonData.length;
    const numCols = Math.ceil(numProducts / 3);

    for (let i = 0; i < numProducts; i++) {
        const product = jsonData[i];
        let repeat1 = `
        <div class="col-md-${Math.floor(12 / numCols)}" onclick="window.location.href='product.html?id=${product.id}'">
            <div class="product">
            <div class="icons-pro">
                <div class="one">
                    <i class="fa-solid fa-tags"></i>
                </div>
                <div class="two">
                    <i class="fa-regular fa-heart"></i>
                </div>
                </div>
                <div class="product-img">
                    <img src="${product.image}" alt="">
                </div>
                <h3>${product.title}</h3>
            <div class="price">
                <span>$${product.price}</span>
                <span class="old">$${parseInt(product.price) + 10}</span></div>
            </div>
        </div>`;

        if (i % numCols === 0) {
            if (i === 0) {
                htmlcontent += `<div class="carousel-item active"><div class="row">`;
            } else {
                htmlcontent += `<div class="carousel-item"><div class="row">`;
            }
        }

        htmlcontent += repeat1;

        if ((i + 1) % numCols === 0 || i === numProducts - 1) {
            htmlcontent += `</div></div>`;
        }
    }

    content.innerHTML = htmlcontent;
}

async function fetchingProducts() {
    const apiUrl = `https://fakestoreapi.com/products`;
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    const content = document.querySelector('.products .carousel-inner');
    let htmlcontent = ``;

    for (let i = 0; i < jsonData.length; i++) {
        const product = jsonData[i];
        let repeat1 = `
        <div class="col-md-3" onclick="window.location.href='product.html?id=${product.id}'">
            <div class="product">
            <div class="icons-pro">
                <div class="one">
                    <i class="fa-solid fa-tags"></i>
                </div>
                <div class="two">
                    <i class="fa-regular fa-heart"></i>
                </div>
                </div>
                <div class="product-img" >
                    <img src="${product.image}" alt="">
                </div>
                <h3>${product.title}</h3>
            <div class="price">
                <span>$${product.price}</span>
                <span class="old">$${parseInt(product.price + 30)}</span></div>
            </div>
        </div>`;

        if (i % 4 === 0) {
            if (i === 0) {
                htmlcontent += `<div class="carousel-item active"><div class="row">`;
            } else {
                htmlcontent += `<div class="carousel-item"><div class="row">`;
            }
        }

        htmlcontent += repeat1;

        if ((i + 1) % 4 === 0 || i === jsonData.length - 1) {
            htmlcontent += `</div></div>`;
        }
    }

    content.innerHTML = htmlcontent;
}

//don't forget dropdown categories



const catItems = document.querySelectorAll('.me-3.categ .col-md-3');
for (let index = 0; index < catItems.length; index++) {
    const catItem = catItems[index];
    catItem.addEventListener('click', function(){
        const category = this.dataset.category;
        fetchingProductsByCategory(category);
    });
}

fetchingProducts();


