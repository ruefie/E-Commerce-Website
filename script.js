// Initialize variables

let products = [];
let originalProducts = [];

const itemsPerPage = 3;
let currentPage = 1;
let selectedCategory = "";



let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode')
  darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})


// Elements
// const htmlElement = document.querySelector("html");
// const darkModeBtn = document.getElementById("dark-mode-btn");
// const lightModeBtn = document.getElementById("light-mode-btn");

// Check if the buttons are found
// if (!darkModeBtn || !lightModeBtn) {
//   console.error("Buttons for toggling themes are missing or not loaded.");
// }

// Retrieve theme from local storage or system setting
// const localStorageTheme = localStorage.getItem("theme");
// const systemSettingDark = window.matchMedia("(prefers-color-scheme: light)");

// let currentThemeSetting =
//   localStorageTheme || (systemSettingDark.matches ? "dark" : "light");

// Function to set the theme
// function setTheme(theme) {
//   currentThemeSetting = theme;
//   htmlElement.setAttribute("data-theme", theme);
//   localStorage.setItem("theme", theme);

//   // Debug logs to confirm the theme setting
//   console.log(`Theme set to: ${theme}`);

//   // Toggle button visibility
//   if (theme === "light") {
//     darkModeBtn.style.display = "block"; // Show dark mode button
//     lightModeBtn.style.display = "none"; // Hide light mode button
//   } else {
//     darkModeBtn.style.display = "none"; // Hide dark mode button
//     lightModeBtn.style.display = "block"; // Show light mode button
//   }
// }

// Add event listeners to buttons
// darkModeBtn?.addEventListener("click", () => {
//   console.log("Dark mode button clicked");
//   setTheme("dark");
// });

// lightModeBtn?.addEventListener("click", () => {
//   console.log("Light mode button clicked");
//   setTheme("light");
// });

// Set the initial theme
// setTheme(currentThemeSetting);



// Fetch products from products.json
const fetchProducts = async () => {
  try {
    const response = await fetch("products.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    products = data;
    originalProducts = [...products];
    displayProducts();
    setupPagination();
  } catch (error) {
    console.error("Error fetching products:", error);
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML =
      "<p>Error loading products. Please try again later.</p>";
  }
};

fetchProducts();


// Variables for search functionality
const searchInput = document.getElementById("search-input");
const searchModal = document.getElementById("search-modal");
const searchResultsContainer = document.getElementById("search-results");


// Search functionality
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();

  if (!query) {
    searchModal.style.display = "none";
    searchModal.innerHTML = "";
    return;
  }

  const matches = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  searchModal.innerHTML = ""; // Clear previous results
  if (matches.length === 0) {
    searchModal.innerHTML = `<p class="no-match">No match found</p>`;
  } else {
    matches.forEach((product) => {
      const searchResultItem = document.createElement("div");
      searchResultItem.className = "search-result-item";
      searchResultItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <span>${product.name}</span>
      `;

      searchResultItem.addEventListener("click", () => {
        displaySearchedProduct(product);
        const filterBtn = document.getElementById('filter-buttons');
        filterBtn.scrollIntoView({ behavior: "smooth" });
        searchModal.style.display = "none";
        searchInput.value = ""; // Clear search input after selection
      });

      searchModal.appendChild(searchResultItem);
    });
  }

  searchModal.style.display = "block";
});

// display products list
function displaySearchedProduct(product) {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = ""; // Clear the grid

  const productCard = document.createElement("div");
  productCard.className = "product-card";
  productCard.innerHTML = `
    <div class="image-container">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="product-info">
      <div class="product-name">
        <h3>${product.name}</h3>
        <i class="fa-regular fa-heart"></i>
      </div>
      <div class="product-price-rating">
        <span class="price">$${product.price}</span>
        <button class="filter-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `;

  productGrid.appendChild(productCard);
  setupAddToCartButtons();
}

// Display products with pagination
function displayProducts() {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const paginatedProducts = filteredProducts.slice(start, end);

  if (paginatedProducts.length === 0) {
    productGrid.innerHTML =
      "<p class='no-products-message'>No products under this category.</p>";
    return;
  }

  paginatedProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <div class="image-container">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-info">
        <div class="product-name">
          <h3>${product.name}</h3>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="product-price-rating">
          <span class="price">$${product.price}</span>
          <button class="filter-btn" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;
    productGrid.appendChild(productCard);
  });

  setupAddToCartButtons();
}

// Set up pagination
function setupPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (totalPages <= 1) return;

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayProducts();
      setupPagination();
    }
  });
  pagination.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.className = "page-button";
    if (i === currentPage) {
      pageButton.classList.add("active");
    }
    pageButton.addEventListener("click", () => {
      currentPage = i;
      displayProducts();
      setupPagination();
    });
    pagination.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayProducts();
      setupPagination();
    }
  });
  pagination.appendChild(nextButton);
}

// Function to sort products
function sortProducts(criteria) {
  if (criteria === "default") {
    products = [...originalProducts];
  } else if (criteria === "nameAsc") {
    products.sort((a, b) => a.name.localeCompare(b.name));
  } else if (criteria === "nameDesc") {
    products.sort((a, b) => b.name.localeCompare(a.name));
  } else if (criteria === "priceAsc") {
    products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (criteria === "priceDesc") {
    products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  // currentPage = 1;
  displayProducts();
  setupPagination();
}

// Event listener for sort dropdown
document.getElementById("filter").addEventListener("change", (e) => {
  sortProducts(e.target.value);
});

// Event listener for category filter buttons
document.getElementById("filter-buttons").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    selectedCategory = e.target.dataset.category || "";
    // currentPage = 1;

    displayProducts();
    setupPagination();
  }
});

// Add to Cart functionality
let cart = [];
let cartCount = 0;

function updateCartIcon() {
  document.getElementById("cart-count").textContent = cartCount;
}

function setupAddToCartButtons() {
  const productGrid = document.getElementById("productGrid");
  productGrid.addEventListener("click", addToCartHandler);
}

function addToCartHandler(event) {
  if (event.target.classList.contains("filter-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    const product = products.find((p) => p.id === productId);

    if (product) {
      addToCart(product);
    }
  }
}

function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  cartCount += 1;
  updateCartIcon();
}

function displayCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      "<p class='no-products-message'>Your cart is empty.</p>";
    document.getElementById("total-items").textContent = "0";
    document.getElementById("total-price").textContent = "0.00";
    return;
  }

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    const itemPrice = parseFloat(item.price.replace("$", ""));
    const itemTotalPrice = itemPrice * item.quantity;
    totalItems += item.quantity;
    totalPrice += itemTotalPrice;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>Price: $${itemPrice.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: $${itemTotalPrice.toFixed(2)}</p>
      </div>
      <button class="remove-btn" data-id="${item.id}">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
  document.getElementById("total-items").textContent = totalItems;
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

// Event listener for remove button in cart modal
document.getElementById("cart-items").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const productId = parseInt(e.target.getAttribute("data-id"));
    const productIndex = cart.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
      cartCount -= cart[productIndex].quantity;
      cart.splice(productIndex, 1);
      updateCartIcon();
      displayCartItems();
    }
  }
});

//event listener for continue shopping button
document.getElementById("shopping-btn").addEventListener("click", () => {
  document.getElementById("cart-modal").classList.remove("active");
  document
    .getElementById("filter-buttons")
    .scrollIntoView({ behavior: "smooth" });
});

// Event listener for checkout button with confetti

const canvas = document.getElementById("confetti"); // Ensure this exists in your HTML
const jsConfetti = new JSConfetti({canvas}); // Attach to canvas, or omit `{ canvas }` for full-screen

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    const checkout = document.createElement("p");
    checkout.textContent = "Your cart is empty. Please add items to proceed with checkout.";
    checkout.className = "checkout"
    document.getElementById("cart-modal").appendChild(checkout);
    return;
  }

  const thankYouMessage = document.createElement("p");
  thankYouMessage.textContent = "Thank you for your purchase! You will now be directed to the payment section";
  thankYouMessage.className = "thank-you-message";
  document.getElementById("cart-modal").appendChild(thankYouMessage);

  jsConfetti.addConfetti({
    confettiRadius: 2, 
    confettiNumber: 500,

  }); 

  setTimeout(() => {
    thankYouMessage.remove();
    document.getElementById("cart-modal").classList.remove("active");
   
    cart = []; 
    cartCount = 0; 
    updateCartIcon();
    displayCartItems(); 
  }, 3000);
});

// Open cart modal
document.getElementById("cart-icon").addEventListener("click", () => {
  displayCartItems();
  document.getElementById("cart-modal").classList.add("active");
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("cart-modal").classList.remove("active");
});

// Close cart modal when clicking outside of modal content
document.getElementById("cart-modal").addEventListener("click", (e) => {
  const modal = document.getElementById("cart-modal");
  const modalContent = document.querySelector(".modal-content");

  if (e.target === modalContent) {
    modal.classList.remove("active");
  }
});
