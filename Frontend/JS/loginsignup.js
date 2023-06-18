


const EventBaseURL = `https://my-cal-com-backend.vercel.app`;

const usersUrl = `${EventBaseURL}/users`;
const signinUrl = `${usersUrl}/register`;
const loginUrl = `${usersUrl}/login`;

let SignupForm = document.getElementById("SignupForm")
SignupForm.addEventListener("submit", (e) => {
  e.preventDefault()
  spinner.style.display = "flex"; //!Spinner
  let password = document.getElementById("password").value;
  let cnf_pass = document.getElementById("cnfpass").value;
  if (password != cnf_pass) {
    swal("Check Password!", "Passwords dosen't match", "warning");
    spinner.style.display = "none"; //!Spinner
    return;
  }
  let userdetails = {
    name: SignupForm.name.value,
    email: SignupForm.email.value,
    password: SignupForm.password.value,
  };
  Postusers(userdetails);
})

async function Postusers(obj) {
  spinner.style.display = "flex"; //!Spinner
  try {
    const res = await fetch(signinUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (res.ok) {
      spinner.style.display = "none"; //!Spinner
      swal("Signup Successful", "Please Login", "success");
    } else {
      spinner.style.display = "none"; //!Spinner
      swal("Error", "Bad request", "error");
    }
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
    swal("Error", "Something went wrong", "error");
    console.log(`Error in Posting`);
  }
}

let LoginForm = document.getElementById("LoginForm")
LoginForm.addEventListener("submit", (e) => {
  spinner.style.display = "flex"; //!Spinner
  e.preventDefault()
  let loginDetails = {
    email: LoginForm.login_email.value,
    password: LoginForm.login_pass.value,
  }
  console.log(loginDetails);
  login_user(loginDetails);
})


let login_user = async (obj) => {
  spinner.style.display = "flex"; //!Spinner
  let res = await fetch(`${EventBaseURL}/users/login`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }
  );
  if (res.ok) {
    let LoginData = await res.json();
    if (LoginData.success == false) {
      swal("Login Failed", "Wrong Credentials", "error");
      spinner.style.display = "none"; //!Spinner
      return;
    }
    // console.log(LoginData);
    localStorage.setItem("accessToken", LoginData.token);
    localStorage.setItem("username", LoginData.name);
    localStorage.setItem("useremail", LoginData.email);

    if (LoginData.token) {
      spinner.style.display = "none"; //!Spinner
      swal("Login Successful", "Redirecting to Dashboard...", "success");
      setTimeout(() => {
        spinner.style.display = "none"; //!Spinner
        window.location.href = "Dashboard.html";
      }, 1000);
    }
  }
};
