const registerForm =
document.getElementById("registerForm");

registerForm.addEventListener(

    "submit",

    async function(event){

        event.preventDefault();

        const name =
        document.getElementById("name").value;

        const email =
        document.getElementById("email").value;

        const password =
        document.getElementById("password").value;

        const role =
        document.getElementById("role").value;

        let url = "";

        if(role === "ROLE_ADMIN"){

            url =
            "http://localhost:8080/auth/register/admin";
        }

        else{

            url =
            "http://localhost:8080/auth/register/user";
        }

        const response = await fetch(

            url,

            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    name:name,
                    email:email,
                    password:password
                })
            }
        );

		const registerMessage =
		document.getElementById("registerMessage");
		
		if(response.ok){

		    registerMessage.innerText =
		    "Registration Successful";

		    registerMessage.style.color =
		    "green";

		    setTimeout(function(){

		        window.location.href =
		        "login.html";

		    }, 1500);
		}

		else{

		    registerMessage.innerText =
		    "This Email is already registered";

		    registerMessage.style.color =
		    "red";
		}
    }
);

const homeBtn =
document.getElementById("homeBtn");

if(homeBtn){

    homeBtn.addEventListener(

        "click",

        function(){

            window.location.href =
            "index.html";
        }
    );
}