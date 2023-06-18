let EventBaseURL = `https://my-cal-com-backend.vercel.app`

//! IF USER NOT PRESENT ---> 
let UserEmail = localStorage.getItem("useremail");

if (!UserEmail) {
  swal("Please Login First!", "You need to login before adding any events..", "info");
  setTimeout(() => {
    window.location.href = "loginSignup.html"
  }, 2000);
}
//! ---------------------->

let fullnameX = UserEmail.split("@")[0];
let UserName = localStorage.getItem("username");

UserShow3.innerHTML = fullnameX + `<p style="font-size: 12px;">(Logout)</p>`;
// console.log(UserEmail);//!-->Consoling current user Email

var navbar = document.getElementById("event_nav");
var sticky = navbar.offsetTop;

window.onscroll = function () {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};


let EventForm = document.getElementById("EventForm")

EventForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let title = EventForm.event_name.value
  let place = EventForm.event_option.value
  let startTime = EventForm.starttime.value
  let color = EventForm.event_color.value
  let endTime = EventForm.endtime.value
  let startDate = EventForm.startDate.value
  let endDate = EventForm.endDate.value
  let event_link = `${UserName.split(" ").join("-")}/${EventForm.event_link.value.split(" ").join("-")}`
  let description = EventForm.event_description.value
  let createdOn = new Date().toISOString().split(".")[0]

  let start = startDate + "T" + startTime + ":00"
  let end = endDate + "T" + endTime + ":00"

  let startValue = +start.split(/\T|\-|\:/).join("")
  let endValue = +end.split(/\T|\-|\:/).join("")
  let createValue = +createdOn.split(/\T|\-|\:/).join("")

  if (startTime >= endTime && endDate <= startDate) {
    swal("Event Start time cannot\n be after endtime", "Please select any other time", "info");
    return
  }
  if (startDate > endDate) {
    swal("Start date cannot\n be after End Date", "Please choose correct date", "info");
    return
  }
  if (startValue < createValue) {
    swal("Event cannot be created on any past date!", "Please select any other date", "warning");
    return
  }
  let event = { userEmail: UserEmail, title, place, start, color, end, event_link, description, createdOn }
  console.log(event);
  CreateEvent(event)
})



async function CreateEvent(event) {
  try {
    let response = await fetch(`${EventBaseURL}/events/newevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        UserEmail: UserEmail,
      },
      body: JSON.stringify(event)
    })
    let Event = await response.json();
    if (Event.Created) {
      swal("Event Created!", "Your Event has been Scheduled.", "success");
      setTimeout(() => {

        window.location.href = "./Dashboard.html";
      }, 2000);
      return;
    } else {
      let overLappTitle = Event.OverlappingEvent.title
      let overLapStart = Event.OverlappingEvent.start
      let overLapEnd = Event.OverlappingEvent.end
      swal("Event Cannot Be Created Created!", `Over-Lapping Event Name :-
      ${overLappTitle} 
      Starts: ${overLapStart}
      Ends: ${overLapEnd}\n 
      Please Readjust date & time to create this event`, "warning");
    }
  } catch (error) {
    swal("Server Error", `${error}`, "info");
    console.log(error)
  }
}



const cancelbutton = document.querySelectorAll(".cancelbutton");
for (let i = 0; i < cancelbutton.length; i++) {
  cancelbutton[i].addEventListener("click", async () => {
    spinner.style.display = "none"; //!Spinner
    swal({
      title: "Cancel Creating Event?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          window.location.assign("./Dashboard.html");
        } else {
          null
        }
      });

  });
}


//? <!----------------------------------------------- < Event Instantaneous Date register> ----------------------------------------------->

EventForm.event_name.addEventListener("input", (e) => {


  EventForm.event_link.value = e.target.value.split(" ").join("-");
  let links = document.getElementById("links");
  showname.innerText = EventForm.event_link.value
  let createdOn = new Date().toISOString().split(".")[0].split("T")[0]

  let link = `mycal.com/${UserName}/${e.target.value}`;
  links.innerText = link
  showlinks.innerText = link
  showcreatedon.innerText = createdOn
});
EventForm.event_option.addEventListener("change", (e) => {
  showlocation.innerText = e.target.value
})
EventForm.starttime.addEventListener("change", (e) => {
  showstarttime.innerText = e.target.value
})
EventForm.event_color.addEventListener("change", (e) => {
  showcolor.innerText = e.target.value
})
EventForm.endtime.addEventListener("change", (e) => {
  showendtime.innerText = e.target.value
})
EventForm.startDate.addEventListener("change", (e) => {
  showstartdate.innerText = e.target.value
})
EventForm.endDate.addEventListener("change", (e) => {
  showenddate.innerText = e.target.value
})
EventForm.event_link.addEventListener("input", (e) => {
  let link = `mycal.com/${UserName}/${e.target.value}`;
  links.innerText = link
  showlinks.innerText = link
})
EventForm.event_description.addEventListener("input", (e) => {
  showdesp.innerText = e.target.value
})




//? <!----------------------------------------------- < Logout> ----------------------------------------------->

let Logout = document.getElementsByClassName("namecircle")[0];
Logout.addEventListener("click", () => {
  swal("Logging Out..", "", "info");
  localStorage.clear();
  setTimeout(() => {
    window.location.href = "./index.html";
  }, 1000);
});
let backbtn = document.querySelector("#event_nav > div > div:nth-child(1) > p");
backbtn.addEventListener("click", () => {
  window.location.href = "Dashboard.html";
});
