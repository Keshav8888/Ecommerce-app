/* ================= USER INFO ================= */

const welcomeMessage =
document.getElementById("welcomeMessage");

const greetingMessage =
document.getElementById("greetingMessage");

/* GET USER NAME */

const userName =
localStorage.getItem("userName");

/* IF USER NOT LOGGED IN */

if(!userName){

    window.location.href =
    "login.html";
}

/* WELCOME MESSAGE */

welcomeMessage.innerText =
`Welcome ${userName}`;

/* GREETING */

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