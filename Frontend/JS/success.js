
const EventBaseURL = "https://my-cal-com-backend.vercel.app"

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
if (params.successId) {
    let id = params.successId.trim().split(`"`)[1];
    let Auth = params.Auth
    console.log(params)
    let container = document.getElementById("SuccessPage")
    if (Auth == "Facebook") {
        container.innerHTML = `
        <div id="greentickholder"></div>
        <div id="orangegoogle">
          <div class="SuccessPageButtonsHolder">
            <img width="180px" src="Images/facebook.png" alt="" />
            <h1 style="font-size: 30px; font-weight: 500">
              Authentication Successful
            </h1>
            <p>Welcome to Mycal Web Service</p>
            <br />
            <button id="LetsGoButton">Go to Home Page</button>
          </div>
        </div>        
        `
    } else {
        container.innerHTML = `
        <div id="greentickholder"></div>
        <div id="orangegoogle">
          <div class="SuccessPageButtonsHolder">
            <img width="150px" src="Images/googlepng.png" alt="" />
            <h1 style="font-size: 30px; font-weight: 500">
              Authentication Successful
            </h1>
            <p>Welcome to Mycal Web Service</p>
            <br />
            <button id="LetsGoButton">Go to Home Page</button>
          </div>
        </div>        
        `
    }
    let LetsGoButton = document.getElementById("LetsGoButton");
    LetsGoButton.addEventListener("click", () => {
        GetUserByID(id);
    });

} else {
    //? <!----------------------------------------------- < failed> ----------------------------------------------->
    let LetsGoButtonFailed = document.getElementById("LetsGoButtonFailed")
    if (LetsGoButtonFailed) {
        LetsGoButtonFailed.addEventListener("click", () => {
            window.location.href = "index.html"
        })

    }
}
async function GetUserByID(id) {
    try {
        let res = await fetch(`${EventBaseURL}/users/${id}`);

        let response = await res.json();
        console.log(response);
        if (response.Wrong) {
            swal("Login Unsuccessful!", `${response.Message}`, "error");
        } else {
            localStorage.setItem("accessToken", response.token);
            localStorage.setItem("username", response.user.name);
            localStorage.setItem("userAvatar", response.user.image);
            localStorage.setItem("useremail", response.user.email);
            swal("Login Successful!", "You are logged in, Lets Explore!", "success");
            setTimeout(() => {
                window.location.href = "Dashboard.html";
            }, 2000);
        }
    } catch (error) {
        console.log(error);
    }
}
