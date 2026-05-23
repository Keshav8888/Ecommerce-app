/* ================= TOKEN CHECK ================= */

const token =
localStorage.getItem("token");

if(!token){

    alert("Please Login First");

    window.location.href =
    "login.html";
}

/* ================= CONTAINER ================= */

const ordersContainer =
document.getElementById("ordersContainer");

/* ================= LOAD ORDERS ================= */

async function loadOrders(){

    try{

        const response =
        await fetch(

            "http://localhost:8080/orders/my-orders",

            {

                headers:{

                    "Authorization":
                    `Bearer ${token}`
                }
            }
        );

        const orders =
        await response.json();

        displayOrders(orders);
    }

    catch(error){

        console.log(error);

        alert("Failed To Load Orders");
    }
}

/* ================= DISPLAY ORDERS ================= */

function displayOrders(orders){

    ordersContainer.innerHTML = "";

    /* NO ORDERS */

    if(orders.length === 0){

        ordersContainer.innerHTML = `

            <h2>
                No Orders Found
            </h2>
        `;

        return;
    }

    /* LOOP */

    orders.forEach(order => {

        let itemsHTML = "";

        order.orderItems.forEach(item => {

            itemsHTML += `

                <div class="order-item">

                    <img
                        src="http://localhost:8080${item.imageUrl}"
                        class="order-image"
                    >

                    <div class="order-details">

                        <div class="product-name">
                            ${item.productName}
                        </div>

                        <div class="company-name">
                            ${item.companyName}
                        </div>

                        <div class="price">
                            ₹${item.price}
                        </div>

                        <div class="quantity">
                            Quantity : ${item.quantity}
                        </div>

                    </div>

                </div>
            `;
        });

        let statusClass = "";

		const status = order.status.replace(/"/g, "").trim();
		
        if(status === "Pending"){

            statusClass = "pending";
        }

        else if(status === "Shipped"){

            statusClass = "shipped";
        }

        else if(status === "Delivered"){

            statusClass = "delivered";
        }

        else{

            statusClass = "cancelled";
        }

        ordersContainer.innerHTML += `

            <div class="order-card">

                <div class="order-top">

                    <div>

                        <h2>
                            Order ${order.id}
                        </h2>

                    </div>

                    <div class="order-status ${statusClass}">

                        ${status}

                    </div>

                </div>

                ${itemsHTML}

                <div class="order-total">

                    Total :
                    ₹${order.totalAmount}

                </div>

            </div>
        `;
    });
}

/* ================= LOGOUT ================= */

const logoutBtn =
document.getElementById("logoutBtn");

logoutBtn.addEventListener(

    "click",

    function(){

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        localStorage.removeItem("userName");

        window.location.href =
        "index.html";
    }
);

/* ================= INITIAL LOAD ================= */

loadOrders();