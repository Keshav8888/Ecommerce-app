const ordersContainer =
document.getElementById("ordersContainer");

/* Check Admin */

const token =
localStorage.getItem("token");

const role =
localStorage.getItem("role");

if(!token || role !== "ROLE_ADMIN"){

    alert("Access Denied");

    window.location.href =
    "login.html";
}

/* LOAD Orders */

async function loadOrders(){

    try{

        const response =
        await fetch(

            "http://localhost:8080/orders/admin/all",

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

/* Display Orders */

function displayOrders(orders){

    ordersContainer.innerHTML = "";

    /* No Orders */

    if(orders.length === 0){

        ordersContainer.innerHTML = `

            <h2>
                No Orders Found
            </h2>
        `;

        return;
    }

    /* Loop Orders */

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

        ordersContainer.innerHTML += `

            <div class="order-card">

                <div class="order-top">

				<div class="user-email">
				    <div class="user-name">
				        UserName :
				        ${order.userName}
				    </div>
					
				    <div class="email-text">
				        UserEmail :
				        ${order.userEmail}
				    </div>
				</div>

                    <select
                        class="status-select"
                        onchange="updateStatus(${order.id}, this.value)"
                    >

                        <option value="Pending"
                        ${order.status === "Pending" ? "selected" : ""}>
                            Pending
                        </option>

                        <option value="Shipped"
                        ${order.status === "Shipped" ? "selected" : ""}>
                            Shipped
                        </option>

                        <option value="Delivered"
                        ${order.status === "Delivered" ? "selected" : ""}>
                            Delivered
                        </option>

                        <option value="Cancelled"
                        ${order.status === "Cancelled" ? "selected" : ""}>
                            Cancelled
                        </option>

                    </select>

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

/* Update Status */

async function updateStatus(id, status){

    try{

        const response =
        await fetch(

            `http://localhost:8080/orders/admin/update-status/${id}`,

            {

                method:"PUT",

                headers:{

                    "Content-Type":
                    "application/json",

                    "Authorization":
                    `Bearer ${token}`
                },

                body:JSON.stringify(status)
            }
        );

        if(response.ok){

            alert(
                "Order Status Updated"
            );

            loadOrders();
        }

        else{

            alert(
                "Status Update Failed"
            );
        }
    }

    catch(error){

        console.log(error);

        alert(
            "Something Went Wrong"
        );
    }
}

/* LogOut */

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

/* Initial Load */

loadOrders();