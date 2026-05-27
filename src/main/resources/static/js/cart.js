/* LOGIN CHECK */

const token =
localStorage.getItem("token");

if(!token){

    alert("Please Login First");
}

/* ================= CART ================= */

const cartItemsContainer =
document.getElementById("cart-items");

let cartItems = [];

/* Empty Cart Popup */

const emptyCartPopup =
document.getElementById("emptyCartPopup");

const closeEmptyCartPopup =
document.getElementById("closeEmptyCartPopup");

function showEmptyCartPopup(){

    emptyCartPopup.style.display =
    "flex";
}

closeEmptyCartPopup.addEventListener(

    "click",

    function(){

        emptyCartPopup.style.display =
        "none";
    }
);

/* ================= LOAD CART ================= */

async function loadCart() {

    const token =
    localStorage.getItem("token");

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

    cartItems =
    await response.json();

    displayCartItems();
}

/* ================= DISPLAY ITEMS ================= */

function displayCartItems() {

    cartItemsContainer.innerHTML = "";

    let mrp = 0;

    let total = 0;

    let saved = 0;

    cartItems.forEach(item => {

        mrp += item.oldPrice * item.quantity;

        total += item.newPrice * item.quantity;

        saved +=
        (item.oldPrice - item.newPrice)
        * item.quantity;

        cartItemsContainer.innerHTML += `

        <div class="cart-card">

            <img
                src="${item.imageUrl}"
                class="cart-image"
            >

            <div class="cart-details">

                <div class="company">
                    ${item.companyName}
                </div>

                <div class="product">
                    ${item.productName}
                </div>

                <div class="price">

                    <div class="new-price">
                        ₹${item.newPrice}
                    </div>

                    <div class="old-price">
                        ₹${item.oldPrice}
                    </div>

                    <div class="discount">
                        ${item.discount}% off
                    </div>

                </div>

				<div class="quantity-box">

				    <button
				        onclick="decreaseQuantity(${item.id}, ${item.quantity})"
				    >
				        -
				    </button>

				    <span>
				        ${item.quantity}
				    </span>

				    <button
				        onclick="increaseQuantity(${item.id}, ${item.quantity})"
				    >
				        +
				    </button>

				</div>

                <br>

                <button
                    class="remove-btn"
                    onclick="removeItem(${item.id})"
                >
                    Remove
                </button>

            </div>

        </div>
        `;
    });

    document.getElementById("mrp")
    .innerText = "₹" + mrp;

    document.getElementById("discount")
    .innerText = "₹" + saved;

    document.getElementById("total")
    .innerText = "₹" + total;

    document.getElementById("savedAmount")
    .innerText = "₹" + saved;
}

/* ================= REMOVE ================= */

/*async function removeItem(id) {

    const token =
    localStorage.getItem("token");*/
	
	/* FIND PRODUCT BEFORE DELETE */

    /*await fetch(

        `http://localhost:8080/cart/remove/${id}`,

        {

            method:"DELETE",

            headers:{

                "Authorization":
                `Bearer ${token}`
            }
        }
    );*/
	
    /* loadCart(); */
	/*if(token){
	    loadCart();
	}
}*/
async function removeItem(id) {

    const token =
    localStorage.getItem("token");

    /* FIND PRODUCT BEFORE DELETE */

    const removedProduct =
    cartItems.find(item => item.id === id);

    /* REMOVE FROM LOCAL STORAGE */

    let cartProducts =
    JSON.parse(localStorage.getItem("cartProducts")) || [];

    cartProducts =
    cartProducts.filter(
        productName =>
        productName !== removedProduct.productName
    );

    localStorage.setItem(
        "cartProducts",
        JSON.stringify(cartProducts)
    );

    await fetch(`http://localhost:8080/cart/remove/${id}`,

	        {

	            method:"DELETE",

	            headers:{

	                "Authorization":
	                `Bearer ${token}`
	            }
	        }
	    );
		
	    /* loadCart(); */
		if(token){
		    loadCart();
		}
}

/* ================= UPDATE QUANTITY ================= */

async function updateQuantity(id, quantity) {

	const token =
	   localStorage.getItem("token");

	   const response = await fetch(

	       `http://localhost:8080/cart/updateQuantity/${id}?quantity=${quantity}`,

	       {
	           method:"PUT",

	           headers:{

	               "Authorization":
	               `Bearer ${token}`
	           }
	       }
	   );

	   if(response.ok){
			console.log(
				"Quantity Updated"
			);
			loadCart();
	   }

	   else{
			alert("Quantity Update Failed");
		}
}

/* Cart increase/decrease button */
function increaseQuantity(id, quantity){

    updateQuantity(
        id,
        quantity + 1
    );
}

function decreaseQuantity(id, quantity){

    if(quantity > 1){

        updateQuantity(
            id,
            quantity - 1
        );
    }
}

/* Order Success Popup */

const orderPopup =
document.getElementById("orderPopup");

const closeOrderPopup =
document.getElementById("closeOrderPopup");

const orderUserName =
document.getElementById("orderUserName");

function showOrderPopup(){

    const userName =
    localStorage.getItem("userName");

    orderUserName.innerText =
    `Dear ${userName},`;

    orderPopup.style.display =
    "flex";
}

closeOrderPopup.addEventListener(

    "click",

    function(){

        orderPopup.style.display =
        "none";
    }
);

/* PLACE ORDER */
async function placeOrder() {

    const token = localStorage.getItem("token");

	/* if user is not logged in */
    if(!token){
        alert("Please Login First");
		/*showLoginPopup();*/
        return;
    }

	/* Empty Cart */
	   if(cartItems.length === 0){
			showEmptyCartPopup();	       
			
			return;
	   }
	   
	 try{
	        const response =
	        await fetch(
	            "http://localhost:8080/orders/place",
	            {

	                method:"POST",
					
	                headers:{

	                    "Authorization":
	                    `Bearer ${token}`
	                }
	            }
	        );

	        if(response.ok){
				
				showOrderPopup();

				/* CLEAR LOCAL STORAGE CART */

				localStorage.removeItem("cartProducts");
				
	            /* Reload Empty Cart */
	            loadCart();
	        }
	        else{
				alert("Order Failed");
	        }
	    }
	    catch(error){
	        console.log(error);
	        alert("Something Went Wrong");
	    }
	}

/* ================= INITIAL LOAD ================= */

loadCart();

/* ================= HOME REDIRECT ================= */

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

/* ================= MY ORDERS ================= */

const myOrdersLink =
document.getElementById("myOrdersLink");

if(myOrdersLink){

    myOrdersLink.addEventListener(

        "click",

        function(event){

            event.preventDefault();

            const token =
            localStorage.getItem("token");

            if(!token){

                alert("Please Login First");

                return;
            }

            window.location.href =
            "orders.html";
        }
    );
}