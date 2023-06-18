let stickynav = document.getElementById("stickynav");
const sticky = stickynav.offsetTop;
window.onscroll = function () {
  if (window.pageYOffset >= sticky) {
    stickynav.classList.add("sticky");
  } else {
    stickynav.classList.remove("sticky");
  }
};
let navclickbtn = document.getElementById("navclickbtn");
navclickbtn.innerHTML = `<svg data-navclose xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path data-navclose d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>`;
navclickbtn.addEventListener("click", () => {
  let NavlinkParent = document.getElementById("NavlinkParent");
  let switcher = NavlinkParent.classList.toggle("navtranslate");
  if (switcher) {
    navclickbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>`;
  } else {
    navclickbtn.innerHTML = `<svg data-navclose xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path data-navclose d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>`;
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.matches("[data-navclose]")) {
    NavlinkParent.classList.remove("navtranslate");
    navclickbtn.innerHTML = `<svg data-navclose xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path data-navclose d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>`;
  }
});
let GoogleRedirects = document.getElementsByClassName("googleRedirect");
for (let i = 0; i < GoogleRedirects.length; i++) {
  GoogleRedirects[i].addEventListener("click", () => {
    window.location.href = "https://my-cal-com-backend.vercel.app/google"
  })
}