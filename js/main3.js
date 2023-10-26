let urlParams = new URLSearchParams(window.location.search);
let category = urlParams.get('category');
async function displayProducts(category)
{
    let htmlcontent = ``;
    let catName;
    if (!category.localeCompare('men') || !category.localeCompare('women'))
        catName = (category += "'s clothing");
    else
        catName = category;
    htmlcontent += `<h4>Products of category <strong>${catName}</strong></h4>`;
    if (!category.localeCompare('men') || !category.localeCompare('women'))
        category += "'s%20clothing";
    const apiUrl = `https://fakestoreapi.com/products/category/${category}`;
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    const content = document.querySelector('.allProductsCat')
    for (let i = 0; i < 4; i++) {
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
                <div class="product-img">
                    <img src="${product.image}" alt="">
                </div>
                <h3>${product.title}</h3>
            <div class="price">
                <span>$${product.price}</span>
                <span class="old">$${parseInt(product.price) + 10}</span></div>
            </div>
        </div>`;

        if (i % 4 === 0) {
            htmlcontent += `<div class="row">`;
        }

        htmlcontent += repeat1;

        if ((i + 1) % 4 === 0 || i === 3) {
            htmlcontent += `</div>`;
        }
    }

    content.innerHTML = htmlcontent;
}
displayProducts(category);