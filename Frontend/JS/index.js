let salestab = document.getElementById("salestab");
let marketingtab = document.getElementById("marketingtab");
let customertab = document.getElementById("customertab");
let recrutingtab = document.getElementById("recrutingtab");
let infotab = document.getElementById("infotab");
let edutab = document.getElementById("edutab");
let salestabbox = document.getElementById("salestabbox");
let marketingtabbox = document.getElementById("marketingtabbox");
let customertabbox = document.getElementById("customertabbox");
let recrutingtabbox = document.getElementById("recrutingtabbox");
let infotabbox = document.getElementById("infotabbox");
let edutabbox = document.getElementById("edutabbox");

function RemoveOtherTabs() {
  let othertabs = document.querySelectorAll("#TabSelectors>div");
  let otherboxes = document.querySelectorAll(".DesignTeamTabsChild");
  for (let i = 0; i < othertabs.length; i++) {
    othertabs[i].classList.remove("activeDesign");
    otherboxes[i].style.display = "none";
  }
}
salestab.addEventListener("click", () => {
  RemoveOtherTabs();
  salestab.classList.add("activeDesign");
  salestabbox.style.display = "flex";
});
marketingtab.addEventListener("click", () => {
  RemoveOtherTabs();
  marketingtab.classList.add("activeDesign");
  marketingtabbox.style.display = "flex";
});
customertab.addEventListener("click", () => {
  RemoveOtherTabs();
  customertab.classList.add("activeDesign");
  customertabbox.style.display = "flex";
});
recrutingtab.addEventListener("click", () => {
  RemoveOtherTabs();
  recrutingtab.classList.add("activeDesign");
  recrutingtabbox.style.display = "flex";
});
infotab.addEventListener("click", () => {
  RemoveOtherTabs();
  infotab.classList.add("activeDesign");
  infotabbox.style.display = "flex";
});
edutab.addEventListener("click", () => {
  RemoveOtherTabs();
  edutab.classList.add("activeDesign");
  edutabbox.style.display = "flex";
});

//? <!----------------------------------------------- < Scheduling Automation> ----------------------------------------------->
let Schlimg1 = document.getElementById("Schlimg1");
let Schlimg2 = document.getElementById("Schlimg2");
let Schlimg3 = document.getElementById("Schlimg3");
let Schlimg4 = document.getElementById("Schlimg4");
let ScAuImg = document.getElementById("ScAuImg");
function RemoveStyleSchel() {
  let otherheads = document.querySelectorAll(".SchedulingRight h1");
  for (let i = 0; i < otherheads.length; i++) {
    otherheads[i].style.color = "rgb(150, 169, 188)";
  }
}
Schlimg1.addEventListener("click", () => {
  RemoveStyleSchel();
  ScAuImg.setAttribute("src", "Images/Home/scl1.jpg");
  Schlimg1.style.color = "rgb(11, 53, 88)";
});
Schlimg2.addEventListener("click", () => {
  RemoveStyleSchel();
  ScAuImg.setAttribute("src", "Images/Home/scl2.jpg");
  Schlimg2.style.color = "rgb(11, 53, 88)";
});
Schlimg3.addEventListener("click", () => {
  RemoveStyleSchel();
  ScAuImg.setAttribute("src", "Images/Home/scl3.jpg");
  Schlimg3.style.color = "rgb(11, 53, 88)";
});
Schlimg4.addEventListener("click", () => {
  RemoveStyleSchel();
  ScAuImg.setAttribute("src", "Images/Home/scl4.jpg");
  Schlimg4.style.color = "rgb(11, 53, 88)";
});
let MyAccountBtn = document.getElementById("MyAccountBtn");
MyAccountBtn.addEventListener("click", () => {
  spinner.style.display = "flex"; //!Spinner
  let user = localStorage.getItem("useremail");
  if (user) {
    spinner.style.display = "none"; //!Spinner
    window.location.href = "./Dashboard.html";
  } else {
    spinner.style.display = "none"; //!Spinner
    window.location.href = "./loginSignup.html";
  }
});
