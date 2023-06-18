# MyCal.com

# Introducing MyCal.com (Clone of Calendly.com)

- Deployed WebSite Link = https://mycal-704.netlify.app
- Deployed Backend URL = https://my-cal-com-backend.vercel.app

![MyCalgt](https://user-images.githubusercontent.com/112753481/221043576-4501abd5-d872-4171-b56a-6e27f607fa9a.png)

# What is MyCal.com??

MyCal is your scheduling automation platform for eliminating the back-and-forth emails for finding the perfect time — and so much more.
It is a tool for scheduling appointments and events. It eliminates the usual back-and-forth emails and messages involved in nailing down time.
MyCal enables a smooth workflow by automating tasks such as appointment booking and rescheduling,
and sending reminders and thank you notes to prospective and existing clients and team members.
You can share your availability preferences and meeting location in one click.

This website is fully functional website with all CRUD operations by user .
They need to go through User Authentication middleware, to perform any interactions

---

# Features :-

- Interactive UI/UX for best customer experiene.
- Google Auth Login and Signup
- User can create events and mark them in calendar.
- Add workflows,get reminders and other Emailing features
- Transitions & Animations

---

# Tech Stack Used: -

## Frontend

| HTML                                                                                                                           | CSS                                                                                                                            | JavaScript                                                                                                                     | BootStrap                                                                                                                      | Full Calendar.js                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| <img width="75px" src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png"> | <img width="75px" src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png"> | <img width="70px" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png"> | <img width="75px" src="https://user-images.githubusercontent.com/25181517/183898054-b3d693d4-dafb-4808-a509-bab54cf5de34.png"> | <img width="75px" src="https://user-images.githubusercontent.com/112753481/233935786-0e96b087-6f65-4591-8ce2-a8f57aced31e.png"> |

## Backend : -

| Node.js                                                                                                                         | Express.js                                                                                                                      | MongoDB                                                                                                       | Passport                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| <img width="70px" src="https://user-images.githubusercontent.com/112753481/229047696-de3bf177-16a0-4161-a140-dd89e4fe7b22.png"> | <img width="75px" src="https://user-images.githubusercontent.com/112753481/229164589-4e724000-542d-4deb-9e11-cca7739c2b01.png"> | <img width="75px" src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_logo_icon_146424.png"> | <img width="75px" src="https://user-images.githubusercontent.com/112753481/233825866-91f342c0-f567-4f9f-af03-e9acc86a784d.png"> |

---

# Routes :-

- ### Users Routes

| METHOD | ENDPOINT        | WHAT IT DOES                                                                          |
| ------ | --------------- | ------------------------------------------------------------------------------------- |
| GET    | /users          | -> Getting All the Users,                                                             |
| POST   | /users/register | -> Register New User (Requires user details in req.body)                              |
| POST   | /users/login    | -> Login existing user (Requires email and passwords, returns token if login success) |

- ### Events Routes

| METHOD | ENDPOINT           | WHAT IT DOES                                                         |
| ------ | ------------------ | -------------------------------------------------------------------- |
| GET    | /events/allevents  | -> Getting All the Events of the User (From user-email)              |
| POST   | /events/newevent   | -> Create a new Event (Sends Email on successfull creation of event) |
| DELETE | /events/delete/:id | -> Delete an Event                                                   |
| PATCH  | /events/update/:id | -> Update an Event                                                   |

- ### Workflows Routes

| METHOD | ENDPOINT          | WHAT IT DOES                                                                 |
| ------ | ----------------- | ---------------------------------------------------------------------------- |
| GET    | /workflows        | -> Getting All Workflows of the user, by user email,                         |
| POST   | /workflows/create | -> Add a Workflow/Reminder (Sends email on successfull creation of workflow) |

- ### Google Routes

| METHOD | ENDPOINT         | WHAT IT DOES                                     |
| ------ | ---------------- | ------------------------------------------------ |
| GET    | /google          | -> Initiating Google Auth                        |
| GET    | /google/callback | -> Redirect URI                                  |
| GET    | /google/login    | -> Getting User Data after Google Authentication |
| GET    | /google/logout   | -> Logging out from the session                  |

# 🔷: Here are some screenshots of website :-

### :large_blue_circle: Home Page :-

## ![Mycalhomepage](https://user-images.githubusercontent.com/112753481/221044962-a07bf5ca-271f-4121-a059-728abcde6101.jpg)

![My calHome Page 2](https://user-images.githubusercontent.com/112753481/221044982-eecdca44-60fa-48af-b9c5-b5519d88ea34.jpg)
![Home page 3](https://user-images.githubusercontent.com/112753481/221465257-76a00068-242e-4c8d-bbb0-720fa9d1c03f.jpg)

### :large_blue_circle: Product Page :-

![Product page](https://user-images.githubusercontent.com/112753481/221465069-ae44c81d-0b89-4e85-a478-975841a5afd1.jpg)

### :large_blue_circle: Login/Signup Page :-

![signup](https://user-images.githubusercontent.com/112753481/233952458-6a343629-cd5a-4a92-946d-b633a1a5a057.png)
![login](https://user-images.githubusercontent.com/112753481/233952469-9e1ad7c0-5963-4653-97b9-2ed389bbf87f.png)

### :large_blue_circle: Oauth Success Pages:-

![AuthSuccess](https://user-images.githubusercontent.com/112753481/235299486-e16c2439-e71b-4748-a1d6-2f10db3a4258.png)

### :large_blue_circle: User Dashboard :-

![Dashboard](https://user-images.githubusercontent.com/112753481/233952618-399a8042-5bf5-40c2-94e8-c40d9ca440c0.png)

### :large_blue_circle: Calendar Page :-

- Month View
  ![calendar2](https://user-images.githubusercontent.com/112753481/233952783-9916da98-ecbe-4df5-be45-140e3ae235d4.png)
- Week View
  ![calendarweekview](https://user-images.githubusercontent.com/112753481/233952891-013ac27e-cbad-430c-b3b5-a405dbf01062.png)

### :large_blue_circle: Create Events Page :-

![addeventone](https://user-images.githubusercontent.com/112753481/233952962-4da20910-9e4a-427e-988d-05da1e176898.png)
![addevent2](https://user-images.githubusercontent.com/112753481/233952975-8fca4b4a-0a5c-494e-a043-48cbf40068dd.png)

### :large_blue_circle: Create Workflows Page :-

## ![Workflows](https://user-images.githubusercontent.com/112753481/221465225-a0c9fe15-73c6-4942-9c0d-9bc5f700f2c3.jpg)

![workfflow](https://user-images.githubusercontent.com/112753481/233953000-b734e66d-fbdc-4932-8a7b-b58dfdb4f68b.png)

---

### Team Members of the Project :-

- Jay Shukla
- Kunal Mehra
- Sitansu Mandal
- Mohima Bahadur
- Punit Juneja

---

## Thankyou for your Time :raised_hands: 💝 :-
