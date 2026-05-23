/* ================= NAVBAR ================= */

const navLinks =
document.getElementById("navLinks");

/* USER HEADER CONTAINER */

const userHeaderContainer =
document.getElementById("userHeaderContainer");

/* GET TOKEN */

const token =
localStorage.getItem("token");

/* IF USER LOGGED IN */

if(token){

    /* NAVBAR */

    navLinks.innerHTML = `

        <a href="products.html">
            Products
        </a>

        <button id="logoutBtn">
            Logout
        </button>
    `;

    /* GET USER NAME */

    const userName =
    localStorage.getItem("userName");

    /* TIME BASED GREETING */

    const hour =
    new Date().getHours();

    let greeting = "";

    if(hour < 12){

        greeting =
        "Good Morning 🌅";
    }

    else if(hour < 17){

        greeting =
        "Good Afternoon ☀️";
    }

    else{

        greeting =
        "Good Evening 🌙";
    }

    /* USER HEADER */

    userHeaderContainer.innerHTML = `

        <div class="user-header">

            <h1>
                Welcome ${userName}
            </h1>

            <p>
                ${greeting}
            </p>

        </div>
    `;

    /* LOGOUT */

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
}

/* ================= LOGIN POPUP ================= */

const loginPopup =
document.getElementById("loginPopup");

const loginBtn =
document.getElementById("loginBtn");

const registerBtn =
document.getElementById("registerBtn");

const cancelPopupBtn =
document.getElementById("cancelPopupBtn");

function showLoginPopup(){

    loginPopup.style.display =
    "flex";
}

cancelPopupBtn.addEventListener(

    "click",

    function(){

        loginPopup.style.display =
        "none";
    }
);

loginBtn.addEventListener(

    "click",

    function(){

        window.location.href =
        "login.html";
    }
);

registerBtn.addEventListener(

    "click",

    function(){

        window.location.href =
        "register.html";
    }
);

/* ================= CART LINK ================= */

const indexCartLink =
document.getElementById("indexCartLink");

indexCartLink.addEventListener(

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

/* ================= SLIDER ================= */

const sliderTrack =
document.querySelector(".slider-track");

const prevBtn =
document.getElementById("prevBtn");

const nextBtn =
document.getElementById("nextBtn");

const cards =
document.querySelectorAll(".home-product-card");

/* SETTINGS */

const cardWidth = 305;

let currentIndex = 0;

/* TOTAL */

const totalCards =
cards.length;

/* HOW MANY CARDS FIT */

const visibleCards =
Math.floor(
    document.querySelector(".slider-container")
    .offsetWidth / cardWidth
);

/* MAX INDEX */

const maxIndex =
totalCards - visibleCards;

/* UPDATE */

function updateSlider(){

    sliderTrack.style.transform =
    `translateX(-${currentIndex * cardWidth}px)`;

    /* LEFT BUTTON */

    prevBtn.disabled =
    currentIndex === 0;

    prevBtn.style.opacity =
    currentIndex === 0 ? "0.4" : "1";

    prevBtn.style.cursor =
    currentIndex === 0
    ? "not-allowed"
    : "pointer";

    /* RIGHT BUTTON */

    nextBtn.disabled =
    currentIndex >= maxIndex;

    nextBtn.style.opacity =
    currentIndex >= maxIndex
    ? "0.4"
    : "1";

    nextBtn.style.cursor =
    currentIndex >= maxIndex
    ? "not-allowed"
    : "pointer";
}

/* NEXT */

nextBtn.addEventListener(

    "click",

    function(){

        if(currentIndex < maxIndex){

            currentIndex++;

            updateSlider();
        }
    }
);

/* PREVIOUS */

prevBtn.addEventListener(

    "click",

    function(){

        if(currentIndex > 0){

            currentIndex--;

            updateSlider();
        }
    }
);

/* INITIAL */

updateSlider();