
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
            console.log(Data.AllEvents);
            RenderCalendar(Data.AllEvents)
            spinner.style.display = "none"; //!Spinner
        }
    } catch (err) {
        RenderCalendar([])
        console.log(err);
        spinner.style.display = "none"; //!Spinner
    }
}


let DummyEvents = [
    {
        title: 'All Day Event',
        start: '2023-04-01'
    },
    {
        title: 'Company Long Event',
        start: '2023-04-07',
        end: '2023-04-10',
        color: "red"
    },
    {
        title: 'Race Event',
        start: '2023-04-11',
        end: '2023-04-12',
        color: "green"
    },
    {
        title: 'Thanks-giving Event',
        start: '2023-04-14',
        end: '2023-04-16',
        color: "gold"
    },
    {
        groupId: '999',
        title: 'Repeating Event',
        start: '2023-04-09T16:00:00'
    },
    {
        groupId: '999',
        title: 'Repeating Event',
        start: '2023-04-16T16:00:00'
    },
    {
        title: 'Conference',
        start: '2023-04-11',
        end: '2023-04-13'
    },
    {
        title: 'Meeting',
        start: '2023-04-12T10:30:00',
        end: '2023-04-12T12:30:00'
    },
    {
        title: 'Lunch',
        start: '2023-04-12T12:00:00',
        end: '2023-04-12T12:00:30'
    },
    {
        title: 'Meeting',
        start: '2023-04-12T14:30:00'
    },
    {
        title: 'Google Meet',
        start: '2023-04-15T14:30:00',
        color: "gold"
    },
    {
        title: 'Birthday Party',
        start: '2023-04-13T07:00:00'
    },
    {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2023-04-28'
    }
]
// RenderCalendar(Events)
function RenderCalendar(Events) {
    spinner.style.display = "flex"; //!Spinner
    if (Events.length == 0) Events = DummyEvents

    var calendarEl = document.getElementById('calendar');
    let currentDate = new Date().toISOString().split(".")[0].split("T")[0]
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: `${currentDate}`,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: Events
    });

    calendar.render();
    spinner.style.display = "none"; //!Spinner
}



//? <!----------------------------------------------- < Extras> ----------------------------------------------->
let fullnameX = UserEmail.split("@")[0];
let UserShow3 = document.getElementById("UserShow3")
UserShow3.innerHTML = fullnameX


//? <!----------------------------------------------- < Logout> ----------------------------------------------->
let Logout = document.getElementsByClassName("namecircle")[0];
Logout.addEventListener("click", () => {
    swal("Logging Out..", "", "info");
    localStorage.clear();
    setTimeout(() => {
        window.location.href = "./index.html";
    }, 1000);
});