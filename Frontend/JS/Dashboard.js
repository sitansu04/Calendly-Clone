let EventBaseURL = `https://my-cal-com-backend.vercel.app`


var navbar = document.getElementById("sticky");
var sticky = navbar.offsetTop;
let spaceNav = document.getElementById("spaceNav")


//! IF USER NOT PRESENT ---> 
let UserEmail = localStorage.getItem("useremail");

if (!UserEmail) {
  swal("Please Login First!", "You need to login before adding any events..", "info");
  setTimeout(() => {
    window.location.href = "loginSignup.html"
  }, 2000);
}
//! ---------------------->


window.onscroll = () => {
  if (window.pageYOffset >= sticky) {
    spaceNav.style.display = "block"
    navbar.classList.add("sticky");
  } else {
    spaceNav.style.display = "none"
    navbar.classList.remove("sticky");
  }
};

let fullnameX = UserEmail.split("@")[0];
Avatarimg.src = localStorage.getItem("userAvatar") || "Images/avatar2.png"
UserShow.innerHTML = localStorage.getItem("username") || fullnameX
UserShow2.innerHTML = localStorage.getItem("username") || fullnameX;
UserShow3.innerHTML =
  fullnameX + `<p style="font-size: 12px;">(Logout)</p>`;
let varName = document.getElementById("idName")

const create = document.getElementById("Create");
const AllEventsContainer = document.querySelector("#content>div");

create.addEventListener("click", () => {
  window.location.assign("../create.html");
});


FetchAllUserEvents(UserEmail);

async function FetchAllUserEvents(UserEmail) {
  spinner.style.display = "flex"; //!Spinner

  try {
    let response = await fetch(`${EventBaseURL}/events/allevents?userEmail=${UserEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
    );

    if (response.ok) {
      let Data = await response.json();
      RenderData(Data.AllEvents);
      console.log(Data.AllEvents);
    }
  } catch (err) {
    spinner.style.display = "none"; //!Spinner
    console.log(err);
  }
}

function RenderData(data) {
  let AllEvents = data.map((item) => {
    let startDate = item.start.split("T")[0].split("-").reverse().join("-")
    let time = item.end.split("T")[1]
    let link = item.event_link.split(" ").join("-")
    return `
      <div id="event_card">
      <div>
      <p>${item.title}</p>
      <img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" alt="">
      <hr class="colorHR" style="background-color:${item.color}"/>
      </div>
      <div>
      <p><span style="color:#075cd4">Date: </span> ${startDate} <br>
      <p><span style="color:#075cd4">Time: </span> ${time}<br>
      <span style="color:#075cd4">Type:</span> ${item.place}</p> 
      <p><span style="font-size:14px;color:#075cd4"> View Booking Data</span></p>
      </div>
      <hr>
      <div id="link">Link : <a href="#" style="font-size:14px">${link}/.event.mycal.com</a></div>
      <button data-id=${item._id} class="Deleter">Delete</button>
  </div>
      
      `
  })
  AllEventsContainer.innerHTML = AllEvents.join("")


  let Deleters = document.querySelectorAll(".Deleter");
  for (let i = 0; i < Deleters.length; i++) {
    Deleters[i].addEventListener("click", (e) => {

      swal({
        title: "Delete This Event?",
        text: "Once deleted, you will not be getting notifications for this event",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            DeleteEvent(e.target.dataset.id)
          } else {
            null
          }
        });
    });
  }
  spinner.style.display = "none"; //!Spinner
}

async function DeleteEvent(id) {
  spinner.style.display = "flex"; //!Spinner
  try {
    let res = await fetch(
      `${EventBaseURL}/events/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: UserEmail, id }),
    }
    );
    if (res.ok) {
      spinner.style.display = "none"; //!Spinner
      swal("Event Deleted Successfully", "Your event has been Deleted", "info");
      setTimeout(() => {
        window.location.href = "";
      }, 700);
    } else {
      swal("Something Went Wrong", "", "error");
      spinner.style.display = "none"; //!Spinner
    }
  } catch (err) {
    spinner.style.display = "none"; //!Spinner
    swal("Something Went Wrong", "", "error");
    console.log(err);
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
