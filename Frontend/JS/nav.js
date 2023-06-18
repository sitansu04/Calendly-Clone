var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
window.onscroll(() => {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});
