let allProducts = [];

async function searchProducts() {
  const query = document.getElementById("searchInput").value.trim();

  if (!query) {
    alert("Search field cannot be empty");
    return;
  }

  const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  const data = await response.json();
  allProducts = data.products;
  displayProducts(allProducts);
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
    `;
    productList.appendChild(div);
  });
}

function sortProducts() {
  const criteria = document.getElementById("sortBy").value;

  if (criteria === "price") {
    allProducts.sort((a, b) => a.price - b.price);
  } else if (criteria === "rating") {
    allProducts.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(allProducts);
}
