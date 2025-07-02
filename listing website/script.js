let allProducts = [];
let filteredProducts = [];

window.onload = () => {
  loadCategories();
  loadAllProducts();
};

async function loadAllProducts() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  allProducts = data.products;
  filteredProducts = [...allProducts];
  displayProducts(filteredProducts);
}

async function loadCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");
  const categories = await res.json();

  const categorySelect = document.getElementById("filterCategory");
  categorySelect.innerHTML = `<option value="">All Categories</option>`;

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
  });
}

async function filterByCategory() {
  const selectedCategory = document.getElementById("filterCategory").value;

  if (!selectedCategory) {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    allProducts = data.products;
  } else {
    const res = await fetch(`https://dummyjson.com/products/category/${selectedCategory}`);
    const data = await res.json();
    allProducts = data.products;
  }

  filteredProducts = [...allProducts];
  filterByPrice(); // also apply price filter
}

function filterByPrice() {
  const min = parseFloat(document.getElementById("minPrice").value) || 0;
  const max = parseFloat(document.getElementById("maxPrice").value) || Infinity;

  filteredProducts = allProducts.filter(p => p.price >= min && p.price <= max);
  displayProducts(filteredProducts);
}

function sortProducts() {
  const sortValue = document.getElementById("sortBy").value;

  if (sortValue === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortValue === "rating-asc") {
    filteredProducts.sort((a, b) => a.rating - b.rating);
  } else if (sortValue === "rating-desc") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(filteredProducts);
}

async function searchProducts() {
  const query = document.getElementById("searchInput").value.trim();

  if (!query) {
    alert("Search field cannot be empty");
    return;
  }

  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  const data = await res.json();
  allProducts = data.products;
  filteredProducts = [...allProducts];
  displayProducts(filteredProducts);
}

function displayProducts(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>Price: $${product.price}</p>
      <p>Rating: ${product.rating}</p>
      <p>Category: ${product.category}</p>
    `;
    productList.appendChild(div);
  });
}
