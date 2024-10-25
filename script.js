//this javacript code is for the products and pagination (refer to line 335 to 447 in the HTML code)

//line# 4, is used when sometimes, the javascript code does not loads correctly, so it is used to make sure that the code runs after the page is loaded. You can just omit this line and just put the script at the end of the <body> tag
// document.addEventListener("DOMContentLoaded", function () {
const products = [
  //create a products array based on the items already indicated on the html code(in my case, i have product name, price and image). You can always add more items here and then access them later. the ID here will be used to identify the product in the array and can be used in the future to access the product by ID.
  {
    id: 1,
    name: "Adidas Samba OG",
    price: "$179.00",
    image: "images/shoes.jpg",
  },
  {
    id: 2,
    name: "Kids Jersey Joggers",
    price: "$19.00",
    image: "images/jersey-joggers-kids.webp",
  },
  {
    id: 3,
    name: "Coach Rowan Satchel",
    price: "$379.00",
    image: "images/coach-rowan-satchel-bag.png",
  },
  {
    id: 4,
    name: "Men Casual Blazer",
    price: "$279.00",
    image: "images/men-casual-blazer.webp",
  },
  {
    id: 5,
    name: "Women Cape Brown",
    price: "$109.00",
    image: "images/women-cape.png",
  },
  {
    id: 6,
    name: "Women Scarf",
    price: "$59.00",
    image: "images/women-scarf.webp",
  },
  { id: 8, name: "Sneakers", price: "$89.00", image: "images/sneakers.jpg" },
  {
    id: 9,
    name: "Denim Jacket",
    price: "$129.00",
    image: "images/denim-jacket.jpg",
  },
  {
    id: 10,
    name: "Leather Bag",
    price: "$239.00",
    image: "images/leather-bag.jpg",
  },
  {
    id: 11,
    name: "Sunglasses",
    price: "$59.00",
    image: "images/sunglasses.jpg",
  },
  { id: 12, name: "Wool Hat", price: "$39.00", image: "images/wool-hat.jpg" },
  { id: 13, name: "Backpack", price: "$89.00", image: "images/backpack.jpg" },
  {
    id: 14,
    name: "Leather Bag",
    price: "$239.00",
    image: "images/leather-bag.jpg",
  },
  {
    id: 15,
    name: "Sunglasses",
    price: "$59.00",
    image: "images/sunglasses.jpg",
  },
  { id: 16, name: "Wool Hat", price: "$39.00", image: "images/wool-hat.jpg" },
  { id: 17, name: "Backpack", price: "$89.00", image: "images/backpack.jpg" },
  {
    id: 10,
    name: "Leather Bag",
    price: "$239.00",
    image: "images/leather-bag.jpg",
  },
  {
    id: 11,
    name: "Sunglasses",
    price: "$59.00",
    image: "images/sunglasses.jpg",
  },
  { id: 12, name: "Wool Hat", price: "$39.00", image: "images/wool-hat.jpg" },
  { id: 13, name: "Backpack", price: "$89.00", image: "images/backpack.jpg" },
  {
    id: 14,
    name: "Leather Bag",
    price: "$239.00",
    image: "images/leather-bag.jpg",
  },
  {
    id: 15,
    name: "Sunglasses",
    price: "$59.00",
    image: "images/sunglasses.jpg",
  },
  { id: 16, name: "Wool Hat", price: "$39.00", image: "images/wool-hat.jpg" },
  { id: 17, name: "Backpack", price: "$89.00", image: "images/backpack.jpg" },
];

const itemsPerPage = 3; //sets how many products will be shown per page (3 products in this example)
let currentPage = 1; //keeps track of the current page number the user is viewing.

function displayProducts() {
  const productGrid = document.getElementById("productGrid"); //We start by selecting the productGrid container, line 335 from html (where products will be displayed) by its ID.
  productGrid.innerHTML = ""; //clears out any previous products. This is necessary to avoid adding products multiple times when switching pages.

  // start and end calculate which products should be shown on the current page.
  const start = (currentPage - 1) * itemsPerPage; //start is calculated based on the currentPage and itemsPerPage. For instance, if on page 2 and showing 3 items per page, start will be (2 - 1) * 3 = 3.
  const end = start + itemsPerPage; //determines the last product for the current page.
  const paginatedProducts = products.slice(start, end); //extracts the part of the products array that should be shown on this page. In this case the start and end of the products array. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

  //i used forEach loop to iterate over the products. How its works: For each product, a <div> is created with a class name "product-card" and populated with the product's image, name, and price (the data here come from the product array). The product card is then appended to the productGrid container.(see line 64). this code makes it now dynamically add more products if we want without having to manually add then to the html code. we just need to add products info to the products array.
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
            <span class="price">${product.price}</span>
            <button class="filter-btn">Add to cart</button>
          </div>
        </div>
      `;
    productGrid.appendChild(productCard);
  });
}

function setupPagination() {
  //This function handles creating and displaying pagination buttons based on the current page.
  const pagination = document.getElementById("pagination"); //pagination selects the pagination container(line 447 in html)
  pagination.innerHTML = ""; //innerHTML = "" clears any previous buttons. Clearing ensures that we don’t stack buttons every time setupPagination() runs.

  const totalPages = Math.ceil(products.length / itemsPerPage); //i used Math.ceil to round up because any leftover products still need a full page.

  const prevButton = document.createElement("button"); //create the button element
  prevButton.textContent = "Previous"; //set the text content of the button to "Previous"
  prevButton.disabled = currentPage === 1; //if current page is equal to 1 its then disabled and not clickable
  prevButton.addEventListener("click", () => {
    //The button, when clicked, decreases currentPage by 1(line 80) and updates the product display and pagination buttons. (lines 81 and 82)
    if (currentPage > 1) {
      currentPage--;
      displayProducts();
      setupPagination();
    }
  });
  pagination.appendChild(prevButton);

  // Create Page Number Buttons
  for (let i = 1; i <= totalPages; i++) {
    //This loop creates a button for each page. The button text is set to the page number. If the page number is the current page, the button is given an "active" style (line 92-94). When clicked, the button sets the currentPage to the clicked page and updates the product display and pagination buttons. (lines 95-99)
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
  const nextButton = document.createElement("button"); //create the button element
  nextButton.textContent = "Next"; //set the text content of the button to "Next"
  nextButton.disabled = currentPage === totalPages; //This code creates the Next button, enabling it only if you’re not on the last page.
  nextButton.addEventListener("click", () => {
    // When clicked, the button increases currentPage by 1 (line 109)and updates the product display and pagination buttons. (lines 110 and 111)
    if (currentPage < totalPages) {
      currentPage++;
      displayProducts();
      setupPagination();
    }
  });
  pagination.appendChild(nextButton);
}

// finally calling the 2 functions below  when the page loads to display the products and pagination buttons.
displayProducts(); //This line calls the displayProducts() function to display the first set of products (e.g., the first 3 items) when the page loads.Without this call, the products wouldn't show up initially because displayProducts() is not automatically triggered.
setupPagination(); //This initializes the pagination buttons based on the number of products. By calling setupPagination() once at the start, we ensure that the navigation (page buttons, previous, and next) is visible from the beginning, allowing users to navigate the pages immediately.
// });
