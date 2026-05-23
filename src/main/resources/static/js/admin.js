const token =
localStorage.getItem("token");

if(!token){

    window.location.href =
    "login.html";
}

/* SUCCESS POPUP */

const successPopup =
document.getElementById("successPopup");

const successMessage =
document.getElementById("successMessage");

const closeSuccessPopup =
document.getElementById("closeSuccessPopup");

function showSuccessPopup(message){

    successMessage.innerText =
    message;

    successPopup.style.display =
    "flex";
}

closeSuccessPopup.addEventListener(

    "click",

    function(){

        successPopup.style.display =
        "none";
    }
);

/* Admin Info */
const welcomeMessage =
document.getElementById("welcomeMessage");

const greetingMessage =
document.getElementById("greetingMessage");

const logoutBtn =
document.getElementById("logoutBtn");

/* GET ADMIN NAME */
const adminName =
localStorage.getItem("userName");

/* SET WELCOME */
welcomeMessage.innerText =
`Welcome ${adminName},`;

/* TIME BASED GREETING */
const hour =
new Date().getHours();

if(hour < 12){

    greetingMessage.innerText =
    "Good Morning 🌅";
}

else if(hour < 17){

    greetingMessage.innerText =
    "Good Afternoon ☀️";
}

else{

    greetingMessage.innerText =
    "Good Evening 🌙";
}

/* LOGOUT */

logoutBtn.addEventListener(

    "click",

    function(){

        localStorage.removeItem("token");

        localStorage.removeItem("email");

        localStorage.removeItem("userName");

        window.location.href =
        "index.html";
    }
);

const productForm =
document.getElementById("productForm");

const adminProducts =
document.getElementById("admin-products");

let allProducts = [];

/* ================= SEARCH ================= */

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

/* ================= LOAD PRODUCTS ================= */

async function loadProducts() {

    const response =
    await fetch("http://localhost:8080/products");

    /*const products =
    await response.json();

    displayProducts(products);*/
	allProducts =
	await response.json();

	displayProducts(allProducts);
}

/* ================= DISPLAY ================= */

function displayProducts(products) {

    adminProducts.innerHTML = "";

    products.forEach(product => {

        adminProducts.innerHTML += `

        <div class="product-card">

            <img
                src="http://localhost:8080${product.imageUrl}"
                class="product-image"
            >

            <div class="product-details">

                <div class="company-name">
                    ${product.companyName}
                </div>

                <div class="product-name">
                    ${product.productName}
                </div>

                <div class="price">

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

                <div>
                    ⭐ ${product.rating}
                </div>

                <div class="action-buttons">

				<button
				    class="edit-btn"
				    onclick='editProduct(${JSON.stringify(product)})'
				>
				    Edit
				</button>

                    <button
                        class="delete-btn"
                        onclick='deleteProduct(${product.id})'
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
        `;
    });
}

/* ================= ADD / UPDATE PRODUCT ================= */

productForm.addEventListener(

    "submit",

    async function(event){

        event.preventDefault();

        const id =
        document.getElementById("productId").value;

		/* IMAGE FILE */

		const imageFile =
		document.getElementById("productImage").files[0];

		/* FORMDATA */

		const formData =
		new FormData();

		formData.append(
		    "companyName",
		    document.getElementById("companyName").value
		);

		formData.append(
		    "productName",
		    document.getElementById("productName").value
		);

		formData.append(
		    "oldPrice",
		    document.getElementById("oldPrice").value
		);

		formData.append(
		    "newPrice",
		    document.getElementById("newPrice").value
		);

		formData.append(
		    "discount",
		    document.getElementById("discount").value
		);

		formData.append(
		    "rating",
		    document.getElementById("rating").value
		);

		formData.append(
		    "category",
		    document.getElementById("category").value
		);

		formData.append(
		    "image",
		    imageFile
		);

        /* ===== UPDATE ===== */

        if(id){
			const token = localStorage.getItem("token");
            const response = await fetch(

                `http://localhost:8080/products/admin/update/${id}`,

                {

                    method:"PUT",

					headers:{
						
						"Authorization":
						`Bearer ${token}`
					},
					
                    body: formData
                }
            );
			
			if(response.ok){
            /*alert("Product Updated Successfully");*/
				showSuccessPopup("Product Updated Successfully");
			}
			else{
				alert("Update Failed!")
			}

            document.getElementById("submitBtn")
            .innerText = "Add Product";
        }

        /* ===== ADD ===== */

        else{

            await fetch(

                "http://localhost:8080/products/admin/add",

                {

                    method:"POST",

					headers:{
						"Authorization":
					    `Bearer ${token}`
					},
					
                    body: formData
                }
            );

            /*alert("Product Added Successfully");*/
			showSuccessPopup(
			    "Product Added Successfully"
			);
        }

        productForm.reset();

        document.getElementById("productId").value = "";

        loadProducts();
    }
);


/* ================= DELETE PRODUCT ================= */

async function deleteProduct(id){

    try{

        const token =
        localStorage.getItem("token");

        const response = await fetch(

            `http://localhost:8080/products/admin/delete/${id}`,

            {

                method:"DELETE",

                headers:{

                    "Authorization":
                    `Bearer ${token}`
                }
            }
        );

        if(response.ok){

            /*alert("Product Deleted Successfully");*/
			showSuccessPopup(
			    "Product Deleted Successfully"
			);

            loadProducts();
        }

        else{

            alert("Delete Failed");
        }
    }

    catch(error){

        console.log(error);

        alert("Error deleting product");
    }
}

/* ================= EDIT MODAL ================= */

const editModal =
document.getElementById("editModal");

const closeModal =
document.getElementById("closeModal");

const cancelBtn =
document.getElementById("cancelBtn");

/* OPEN MODAL */

function editProduct(product){

    editModal.style.display =
    "flex";

    document.getElementById("editProductId").value =
    product.id;

    document.getElementById("editCompanyName").value =
    product.companyName;

    document.getElementById("editProductName").value =
    product.productName;

    document.getElementById("editOldPrice").value =
    product.oldPrice;

    document.getElementById("editNewPrice").value =
    product.newPrice;

    document.getElementById("editDiscount").value =
    product.discount;

    document.getElementById("editRating").value =
    product.rating;

    document.getElementById("editCategory").value =
    product.category;
}

/* CLOSE MODAL */

closeModal.onclick = function(){

    editModal.style.display =
    "none";
};

/*cancelBtn.onclick = function(){

    editModal.style.display =
    "none";
};*/

/* UPDATE PRODUCT */

document.getElementById("editProductForm")
.addEventListener(

    "submit",

    async function(event){

        event.preventDefault();

        const id =
        document.getElementById("editProductId").value;

        const imageFile =
        document.getElementById("editProductImage").files[0];

        const formData =
        new FormData();

        formData.append(
            "companyName",
            document.getElementById("editCompanyName").value
        );

        formData.append(
            "productName",
            document.getElementById("editProductName").value
        );

        formData.append(
            "oldPrice",
            document.getElementById("editOldPrice").value
        );

        formData.append(
            "newPrice",
            document.getElementById("editNewPrice").value
        );

        formData.append(
            "discount",
            document.getElementById("editDiscount").value
        );

        formData.append(
            "rating",
            document.getElementById("editRating").value
        );

        formData.append(
            "category",
            document.getElementById("editCategory").value
        );

        if(imageFile){

            formData.append(
                "image",
                imageFile
            );
        }
		else{
			formData.append(
				"image",
				new Blob()
			);
		}

		const token = localStorage.getItem("token");
		
        const response =
        await fetch(

            `http://localhost:8080/products/admin/update/${id}`,

            {

                method:"PUT",
				
				headers:{
					
					"Authorization":
					`Bearer ${token}`
				},

                body: formData
            }
        );

        if(response.ok){

            /*alert("Product Updated Successfully");*/
			showSuccessPopup(
			    "Product Updated Successfully"
			);

            editModal.style.display =
            "none";

            loadProducts();
        }

        else{

            alert("Update Failed");
        }
    }
);

/* ================= EDIT PRODUCT ================= */

/*function editProduct(product){

    document.getElementById("productId").value =
    product.id;

    document.getElementById("companyName").value =
    product.companyName;

    document.getElementById("productName").value =
    product.productName;

    document.getElementById("oldPrice").value =
    product.oldPrice;

    document.getElementById("newPrice").value =
    product.newPrice;

    document.getElementById("discount").value =
    product.discount;

    document.getElementById("rating").value =
    product.rating;

    document.getElementById("category").value =
    product.category;

    document.getElementById("submitBtn")
    .innerText = "Update Product";

    window.scrollTo({

        top:0,
        behavior:"smooth"
    });
} */

/* ================= INITIAL LOAD ================= */

loadProducts();

if(logoutBtn){

    logoutBtn.addEventListener(

        "click",

        function(){

            /* REMOVE LOGIN DATA */

            localStorage.removeItem("token");

            localStorage.removeItem("role");

            localStorage.removeItem("userName");

            /* REDIRECT */

            window.location.href =
            "index.html";
        }
    );
}