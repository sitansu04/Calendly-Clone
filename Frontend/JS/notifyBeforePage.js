let EventBaseURL = "https://my-cal-com-backend.vercel.app"

//! IF USER NOT PRESENT ---> 
let UserEmail = localStorage.getItem("useremail");

if (!UserEmail) {
  swal("Please Login First!", "You need to login before adding any events..", "info");
  setTimeout(() => {
    window.location.href = "loginSignup.html"
  }, 2000);
}
//! ---------------------->

let schduledDateTime = "";
let userMail = "";
let UserName = localStorage.getItem("username") || UserEmail.split("@")[0] || "User"

let fullnameX = UserEmail.split("@")[0];
UserShow3.innerHTML =
  fullnameX + `<p style="font-size: 12px;">(Logout)</p>`;
console.log(UserEmail);

async function getData() {
  spinner.style.display = "flex"; //!Spinner
  let response = await fetch(`${EventBaseURL}/events/allevents?userEmail=${UserEmail}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  let data = await response.json();
  showEvents(data.AllEvents);

}
getData();

//? <!----------------------------------------------- < Appending data in select tag> ----------------------------------------------->

function showEvents(data) {
  let userEvents = document.querySelector("#userEvents");
  data.forEach((element) => {

    let option = document.createElement("Option");
    option.value = JSON.stringify(element);
    option.innerText = element.title;
    userEvents.append(option);
  });
  spinner.style.display = "none"; //!Spinner
}

//? <!----------------------------------------------- < Getting data from select tag and changing body and subject> ----------------------------------------------->

let userEvents = document.querySelector("#userEvents");
userEvents.addEventListener("change", () => {
  spinner.style.display = "flex"; //!Spinner
  try {
    let data = JSON.parse(userEvents.value);
    changeSubjectandBody(data);
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
  }
});

function changeSubjectandBody(event) {
  localStorage.setItem("WorkFlowEvent", JSON.stringify(event))
  spinner.style.display = "flex"; //!Spinner

  let subjectText = document.querySelector("#subjectText");
  let bodyText = document.querySelector("#bodyText");

  let start = event.start.split("T")

  subjectText.innerText = `Reminder: ${event.title} is at ${start[1]} on ${start[0]}`;
  bodyText.textContent = `Hi ${UserName}, 

  This is a friendly reminder that your ${event.title} is at ${start[1]} on ${start[0]}`;

  let start_time = event.starttime.split(" ");
  start_time = start_time[0] + ":" + start_time[1];

  schduledDateTime = event.startdate + ":" + start_time;

  userMail = UserEmail;
  spinner.style.display = "none"; //!Spinner
}

//? <!----------------------------------------------- < Getting data from form> ----------------------------------------------->

let SendMailForm = document.querySelector("form");
SendMailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  spinner.style.display = "flex"; //!Spinner

  let event = JSON.parse(localStorage.getItem("WorkFlowEvent"))

  event.TwValue = SendMailForm.beforeTimeValue.value || 30;
  event.TwUnit = SendMailForm.beforeTimeUnit.value;
  event.TwSub = SendMailForm.subjectText.value;
  event.TwBody = SendMailForm.bodyText.value;

  console.log(event);
  FetchMailing(event);
});




async function FetchMailing(details) {
  spinner.style.display = "flex"; //!Spinner
  console.log(userMail);
  let SendingMail = await fetch(`${EventBaseURL}/workflow/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  }
  );
  if (SendingMail.status == 200) {
    setTimeout(() => {
      spinner.style.display = "none"; //!Spinner
      swal("Your Workflow has been Scheduled", "", "success");
    }, 2000);
  } else {
    spinner.style.display = "none"; //!Spinner
    swal("Pleas select correct Time & Event", "", "info");
  }
}
let Logout = document.getElementsByClassName("namecircle")[0];
Logout.addEventListener("click", () => {
  swal("Logging Out..", "", "info");
  localStorage.clear();
  setTimeout(() => {
    window.location.href = "./index.html";
  }, 1000);
});