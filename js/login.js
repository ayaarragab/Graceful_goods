function addToCart(event) {
    event.preventDefault();
    const productId = event.target.dataset.id;
    console.log('Product ID:', productId);
    const isLoggedIn = checkLoginStatus();
  
    if (isLoggedIn) {
      const cart = getCartFromLocalStorage();
      cart.push(productId);
      saveCartToLocalStorage(cart);
      console.log('Product added to the cart. Product ID:', productId);
    } else {
      alert('Please log in to add products to the cart.');
      window.location.href = 'login.html';
    }
  }
  
  async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const isAuthenticated = await loginUser(username, password);
  
    if (isAuthenticated) {
      alert('Login successful!');
    } else {
      alert('Invalid username or password. Please try again.');
    }
  }
  
  function checkLoginStatus() {
    const token = localStorage.getItem('token');
    return !!token;
  }
  
  async function loginUser(username, password) {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      return true;
    } else {
      return false;
    }
  }
  
  function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function getCartFromLocalStorage() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-primary')) {
      addToCart(event);
    }
  });
  
  
  document.addEventListener('DOMContentLoaded', function () {
    checkLoginStatus();
    addEventListeners();
  });