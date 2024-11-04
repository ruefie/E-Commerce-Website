
// document.addEventListener("DOMContentLoaded", function () {
let products = [
 
  {
    id: 1,
    name: "Adidas Samba OG",
    price: "179.00",
    image: "images/shoes.jpg",
    category: "Women"
  },
  {
    id: 2,
    name: "Kids Jersey Joggers",
    price: "19.00",
    image: "images/jersey-joggers-kids.webp",
    category: "Kids"
  },
  {
    id: 3,
    name: "Coach Rowan Satchel",
    price: "379.00",
    image: "images/coach-rowan-satchel-bag.png",
    category: "Women"
  },
  {
    id: 4,
    name: "Men Casual Blazer",
    price: "279.00",
    image: "images/men-casual-blazer.webp",
    category: "Men"
  },
  {
    id: 5,
    name: "Women Cape Brown",
    price: "109.00",
    image: "images/women-cape.png",
    category: "Women"
  },
  {
    id: 6,
    name: "Women Scarf",
    price: "59.00",
    image: "images/women-scarf.webp",
    category: "Women"
  },
  { id: 8, name: "Sneakers", price: "$89.00", image: "images/sneakers.jpg", category: "Men" },
  {
    id: 9,
    name: "Denim Jacket",
    price: "129.00",
    image: "images/denim-jacket.jpg",
    category: "Men"
  },
  {
    id: 10,
    name: "Leather Bag",
    price: "239.00",
    image: "images/leather-bag.jpg",
    category: "Women"
  },
  {
    id: 11,
    name: "Sunglasses",
    price: "59.00",
    image: "images/sunglasses.jpg",
    category: "Women"
  },
  { id: 12, name: "Wool Hat", price: "39.00", image: "images/wool-hat.jpg",category: "Women" },
  { id: 13, name: "Backpack", price: "89.00", image: "images/backpack.jpg",category: "Women" },
  {
    id: 14,
    name: "Leather Bag",
    price: "239.00",
    image: "images/leather-bag.jpg",
    category: "Women"
  },
  {
    id: 15,
    name: "Sunglasses",
    price: "59.00",
    image: "images/sunglasses.jpg",
    category: "Women"
  },
  { id: 16, name: "Wool Hat", price: "39.00", image: "images/wool-hat.jpg" ,category: "Women"},
  { id: 17, name: "Backpack", price: "89.00", image: "images/backpack.jpg",category: "Women" },
  {
    id: 10,
    name: "Leather Bag",
    price: "239.00",
    image: "images/leather-bag.jpg",
    category: "Women"
  },
  {
    id: 11,
    name: "Sunglasses",
    price: "59.00",
    image: "images/sunglasses.jpg",
    category: "Women"
  },
  { id: 12, name: "Wool Hat", price: "39.00", image: "images/wool-hat.jpg",category: "Women" },
  { id: 13, name: "Backpack", price: "89.00", image: "images/backpack.jpg",category: "Women" },
  {
    id: 14,
    name: "Leather Bag",
    price: "239.00",
    image: "images/leather-bag.jpg",
    category: "Women"
  },
  {
    id: 15,
    name: "Sunglasses",
    price: "59.00",
    image: "images/sunglasses.jpg",
    category: "Women"
  },
  { id: 16, name: "Wool Hat", price: "39.00", image: "images/wool-hat.jpg",category: "Women" },
  { id: 17, name: "Backpack", price: "89.00", image: "images/backpack.jpg",category: "Women" },
];

const itemsPerPage = 3; 
let currentPage = 1; 
let selectedCategory = "";



function displayProducts() {
  const productGrid = document.getElementById("productGrid"); 
  productGrid.innerHTML = ""; 
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  // Filter products based on selected category; if no category is selected, show all
  const filteredProducts = selectedCategory
  ? products.filter(product => product.category === selectedCategory)
  : products;
  
  const paginatedProducts = filteredProducts.slice(start, end); 

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
            <button class="filter-btn" data-id="${product.id}">Add to cart</button>
          </div>
        </div>
      `;
    productGrid.appendChild(productCard);
  });
  setupAddToCartButtons();

}

function setupPagination() {
  
  const pagination = document.getElementById("pagination"); 
  pagination.innerHTML = ""; 

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); 
//Create Previous Button
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

  // Create Page Number Buttons
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

  // Create Next Button
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

  // Copy of original products order for default sorting
  const originalProducts = [...products];
  function sortProducts(criteria) {
    if (criteria === "default") {
      products = [...originalProducts];
    } else if (criteria === "nameAsc") {
      products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "nameDesc") {
      products.sort((a, b) => b.name.localeCompare(a.name));
    } else if (criteria === "priceAsc") {
      products.sort((a, b) => a.price - b.price);
    } else if (criteria === "priceDesc") {
      products.sort((a, b) => b.price - a.price);
    }

    currentPage = 1; 
    displayProducts(); 
    setupPagination(); 
  }




document.getElementById("filter").addEventListener("change", (e) => {
  sortProducts(e.target.value);
});

//filter products by category
document.getElementById("filter-buttons").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    selectedCategory = e.target.dataset.category || ""; // Get category from custom data attribute, or show all if empty
    currentPage = 1; 

    displayProducts();
    setupPagination();
  }
}); 


// Cart functionality. Initialize cart and cart count
let cart = [];
let cartCount = 0;

// Update the cart icon count
function updateCartIcon() {
  document.getElementById("cart-count").textContent = cartCount;
}

// Add event listener for "Add to Cart" button
// Add a single event listener to the product grid for "Add to Cart" buttons
function setupAddToCartButtons() {
  const productGrid = document.getElementById("productGrid");

  // Remove any existing listener to avoid duplicate listeners
  productGrid.removeEventListener("click", addToCartHandler);

  // Attach a new event listener for delegation
  productGrid.addEventListener("click", addToCartHandler);
}

// The event handler function for "Add to Cart" buttons
function addToCartHandler(event) {
  if (event.target.classList.contains("filter-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    const product = products.find(p => p.id === productId);

    if (product) {
      addToCart(product);
    }
  }
}

// Add product to cart
function addToCart(product) {
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1; // Increment quantity if already in cart
  } else {
    cart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
  }

  cartCount += 1;
  updateCartIcon();
}


// Display cart items in the modal
function displayCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; // Clear previous content

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
        <p>Price: $${itemPrice}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: $${itemTotalPrice.toFixed(2)}</p>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  document.getElementById("total-items").textContent = totalItems;
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

// Open cart modal
document.getElementById("cart-icon").addEventListener("click", () => {
  displayCartItems();
  document.getElementById("cart-modal").classList.add("active");
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("cart-modal").classList.remove("active");
});


// Close cart modal when clicking outside of it
document.addEventListener("click", (e) => {
  if (e.target.id === "cart-modal") {
    document.getElementById("cart-modal").classList.remove("active");
  }
});


displayProducts(); 
setupPagination(); 
setupAddToCartButtons();

// });

