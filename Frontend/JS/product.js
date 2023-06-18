let MyAccountBtn = document.getElementById("MyAccBtn");
MyAccountBtn.addEventListener("click", () => {
  let user = localStorage.getItem("useremail");
  if (user) {
    window.location.href = "./Dashboard.html";
  } else {
    window.location.href = "./loginSignup.html";
  }
});
