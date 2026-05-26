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

/* Slider */

/* ================= MULTIPLE SLIDERS ================= */

const allSections =
document.querySelectorAll(".home-products-section");

allSections.forEach(function(section){

    const sliderTrack =
    section.querySelector(".slider-track");

    const prevBtn =
    section.querySelector(".left-btn");

    const nextBtn =
    section.querySelector(".right-btn");

    const cards =
    section.querySelectorAll(".home-product-card");

    const container =
    section.querySelector(".slider-container");

    let currentIndex = 0;

    const gap = 25;

    const cardWidth =
    cards[0].offsetWidth;

    const moveAmount =
    cardWidth + gap;

    const totalCards =
    cards.length;

    function getVisibleCards(){

        return Math.floor(
            container.offsetWidth / moveAmount
        );
    }

    function getMaxIndex(){

        return Math.max(
            0,
            totalCards - getVisibleCards()
        );
    }

    function updateSlider(){

        const maxIndex =
        getMaxIndex();

        if(currentIndex < 0){

            currentIndex = 0;
        }

        if(currentIndex > maxIndex){

            currentIndex = maxIndex;
        }

        sliderTrack.style.transform =
        `translateX(-${currentIndex * moveAmount}px)`;

        /* LEFT BUTTON */

        if(currentIndex === 0){

            prevBtn.disabled = true;

            prevBtn.style.opacity = "0.4";

            prevBtn.style.cursor =
            "not-allowed";
        }

        else{

            prevBtn.disabled = false;

            prevBtn.style.opacity = "1";

            prevBtn.style.cursor =
            "pointer";
        }

        /* RIGHT BUTTON */

        if(currentIndex >= maxIndex){

            nextBtn.disabled = true;

            nextBtn.style.opacity = "0.4";

            nextBtn.style.cursor =
            "not-allowed";
        }

        else{

            nextBtn.disabled = false;

            nextBtn.style.opacity = "1";

            nextBtn.style.cursor =
            "pointer";
        }
    }

    nextBtn.addEventListener(

        "click",

        function(){

            if(currentIndex < getMaxIndex()){

                currentIndex++;

                updateSlider();
            }
        }
    );

    prevBtn.addEventListener(

        "click",

        function(){

            if(currentIndex > 0){

                currentIndex--;

                updateSlider();
            }
        }
    );

    window.addEventListener(

        "resize",

        function(){

            updateSlider();
        }
    );

    updateSlider();
});