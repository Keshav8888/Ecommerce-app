const productsContainer = document.getElementById("products-container");

const categoryFilter = document.getElementById("categoryFilter");

const priceSort = document.getElementById("priceSort");

let allProducts = [];

/* Login PopUp */

const loginPopup = document.getElementById("loginPopup");

const loginBtn = document.getElementById("loginBtn");

const registerBtn = document.getElementById("registerBtn");

const cancelPopupBtn = document.getElementById("cancelPopupBtn");

function showLoginPopup(){
    loginPopup.style.display = "flex";
}

cancelPopupBtn.addEventListener(

    "click",

    function(){
        loginPopup.style.display = "none";
    }
);

loginBtn.addEventListener(

    "click",

    function(){
        window.location.href = "login.html";
    }
);

registerBtn.addEventListener(

    "click",

    function(){
        window.location.href = "register.html";
    }
);

/* Cart Popup*/

const cartPopup = document.getElementById("cartPopup");

const closeCartPopup = document.getElementById("closeCartPopup");

const goToCartBtn = document.getElementById("goToCartBtn");

function showCartPopup(){
    cartPopup.style.display = "flex";
}

closeCartPopup.addEventListener(

    "click",

    function(){
        cartPopup.style.display = "none";
    }
);

goToCartBtn.addEventListener(

    "click",

    function(){
        window.location.href = "cart.html";
    }
);

/* ================= SYNC CART PRODUCTS ================= */

async function syncCartProducts(){

    const token =
    localStorage.getItem("token");

    /* USER NOT LOGGED IN */

    if(!token){

        localStorage.removeItem("cartProducts");

        return;
    }

    try{

        const response =
        await fetch(

            "http://localhost:8080/cart",

            {

                headers:{

                    "Authorization":
                    `Bearer ${token}`
                }
            }
        );

        const cartItems =
        await response.json();

        /* GET PRODUCT NAMES */

        const cartProductNames =
        cartItems.map(item => item.productName);

        /* UPDATE LOCAL STORAGE */

        localStorage.setItem(

            "cartProducts",

            JSON.stringify(cartProductNames)
        );
    }

    catch(error){

        console.log(
            "Cart Sync Failed"
        );
    }
}

/* Load Products */

async function loadProducts() {
    const response = await fetch("http://localhost:8080/products");

    allProducts = await response.json();
    displayProducts(allProducts);
}

/* Display Products */

function displayProducts(products) {
    productsContainer.innerHTML = "";

    /* Get Cart Products From Local Storage */
    let cartProductNames = JSON.parse(localStorage.getItem("cartProducts")) || [];

    products.forEach(product => {

        /* Check Product Exists in Cart */
        const isAdded = cartProductNames.includes(product.productName);

        productsContainer.innerHTML += `

        <div class="product-card">

            <img
                src="${product.imageUrl}"
                class="product-image"
            >

            <div class="product-details">

                <div class="company-name">
                    ${product.companyName}
                </div>

                <div class="product-name">
                    ${product.productName}
                </div>

                <div class="price-section">

                    <div class="new-price">
                        ₹${product.newPrice}
                    </div>

                    <div class="old-price">
                        ₹${product.oldPrice}
                    </div>

                    <div class="discount">
                        ${product.discount}% off
                    </div>

                </div>

                <div class="rating">
                    ⭐ ${product.rating}
                </div>

                <button
                    class="cart-btn ${isAdded ? 'added-btn' : ''}"
                    onclick='addToCart(${JSON.stringify(product)})'
                    ${isAdded ? 'disabled' : ''}
                >
                    ${isAdded ? 'Added To Cart' : 'Add To Cart'}
                </button>

            </div>

        </div>
        `;
    });
}

/* Filter and Sort */

function applyFilters() {
    let filteredProducts = [...allProducts];

    /* Category Filter */
    const selectedCategory = categoryFilter.value;

    if(selectedCategory !== "All") {
		
        filteredProducts = filteredProducts.filter(product =>
            product.category === selectedCategory
        );
    }

    /* Price Sort */

    const selectedSort = priceSort.value;

    if(selectedSort === "lowToHigh") {

        filteredProducts.sort((a,b) => a.newPrice - b.newPrice);
    }

    else if(selectedSort === "highToLow") {

        filteredProducts.sort((a,b) => b.newPrice - a.newPrice);
    }

    displayProducts(filteredProducts);
}

/*  Event Listeners */

categoryFilter.addEventListener("change",applyFilters);

priceSort.addEventListener("change",applyFilters);


/* Add To Cart */

async function addToCart(product) {

    const token = localStorage.getItem("token");

    if(!token){

        showLoginPopup();

        return;
    }

    /* CHECK IF PRODUCT ALREADY EXISTS */

    let cartProducts =
    JSON.parse(localStorage.getItem("cartProducts")) || [];

    if(cartProducts.includes(product.productName)){

        return;
    }

    const cartProduct = {

        productName: product.productName,
        companyName: product.companyName,
        oldPrice: product.oldPrice,
        newPrice: product.newPrice,
        discount: product.discount,
        rating: product.rating,
        imageUrl: product.imageUrl,
        quantity: 1
    };

    await fetch("http://localhost:8080/cart/add", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization":
            `Bearer ${token}`
        },

        body: JSON.stringify(cartProduct)
    });

    /* SAVE PRODUCT NAME */

    cartProducts.push(product.productName);

    localStorage.setItem(
        "cartProducts",
        JSON.stringify(cartProducts)
    );

    /* RELOAD PRODUCTS */

    displayProducts(allProducts);

    showCartPopup();
}


/* ================= INITIAL LOAD ================= */

/*loadProducts();*/

async function initializePage(){

    await syncCartProducts();

    await loadProducts();
}

initializePage();

/* HOME REDIRECT */

const homeLink = document.getElementById("homeLink");

if(homeLink){

    homeLink.addEventListener("click", function(){

        const role = localStorage.getItem("role");

        if(role === "ROLE_USER"){
            window.location.href = "user.html";
        }

        else{
            window.location.href = "index.html";
        }
    });
}

/* Search Box */

const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener(

    "keyup",

    function(){

        const searchText =
        searchInput.value.toLowerCase();

        const filteredProducts =
        allProducts.filter(product =>

            product.productName
            .toLowerCase()
            .includes(searchText)

            ||

            product.companyName
            .toLowerCase()
            .includes(searchText)
        );

        displayProducts(filteredProducts);
    }
);

/* CART LINK */

const cartLink =
document.getElementById("cartLink");

if(cartLink){

    cartLink.addEventListener(

        "click",

        function(event){

            const token =
            localStorage.getItem("token");

            if(!token){

                event.preventDefault();

                showLoginPopup();
            }
        }
    );
}

/* My Orders */

const myOrdersLink =
document.getElementById("myOrdersLink");

if(myOrdersLink){

    myOrdersLink.addEventListener(

        "click",

        function(event){

            const token =
            localStorage.getItem("token");

            if(!token){

                event.preventDefault();

                showLoginPopup();
            }
        }
    );
}