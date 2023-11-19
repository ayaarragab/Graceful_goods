(async () => {
    function getCartFromLocalStorage() {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    }
  
    const productIds = getCartFromLocalStorage();
  
    async function fetchProductDetails(productId) {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (response.ok) {
        const productData = await response.json();
        return productData;
      } else {
        console.error('Error fetching product details:', response.status);
        return null;
      }
    }
  
    const productsPromises = productIds.map(fetchProductDetails);
    const products = await Promise.all(productsPromises);
  
    function displayProducts(products) {
        const productListContainer = document.getElementById('cartProducts');
      
        products.forEach(product => {
          const productElement = createProductElement(product);
          productListContainer.innerHTML += productElement;
        });
      }
      
  
    function createProductElement(product) {
      const productElement = `<div class="product m-4">
                <div class="product-img">
                    <img src="${product.image}" alt="">
                </div>
                <h3>${product.title}</h3>
            <div class="price">
                <span>$${product.price}</span>
            </div>`;
      return productElement;
    }
  
    displayProducts(products);
  })();
  