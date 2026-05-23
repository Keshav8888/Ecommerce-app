const loginForm =
document.getElementById("loginForm");

loginForm.addEventListener(

    "submit",

    async function(event){

        event.preventDefault();

        const email =
        document.getElementById("email").value;

        const password =
        document.getElementById("password").value;

        const response = await fetch(

            "http://localhost:8080/auth/login",

            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    email:email,
                    password:password
                })
            }
        );

		const loginError =
		document.getElementById("loginError");
		
		if(response.ok){
			
			loginError.innerText = "";

		    const data =
		    await response.json();

		    /* SAVE TOKEN */
		    localStorage.setItem(
		        "token",
		        data.token
		    );
			
		    /* SAVE ROLE */
		    localStorage.setItem(
		        "role",
		        data.role
		    );

		    /* SAVE NAME */
		    localStorage.setItem(
		        "userName",
		        data.name
		    );

			
		    /* ROLE BASED REDIRECT */

		    if(data.role === "ROLE_ADMIN"){

		        window.location.href =
		        "admin.html";
		    }

		    else{
		        window.location.href =
		        "user.html";
		    }
		}
		
        else{
			loginError.innerText =
			    "Invalid Credentials";
        }
    }
);

/* Home Button */
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