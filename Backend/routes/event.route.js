const express = require("express");
const { EventModel } = require("../models/event.model");
const { sendMail } = require("../config/mail");
const { EventCreatedTemplate } = require("../config/emailtemplate");
const { Usermodel } = require("../models/user.model");

const EventRouter = express.Router()
require("dotenv").config();



//! CREATE NEW EVENT> ----------------------------------------------->
EventRouter.post("/newevent", async (req, res) => {
    let email = req.body.userEmail
    let startTime = req.body.start.split(/\T|\-|\:/).join("")
    let endTime = req.body.end.split(/\T|\-|\:/).join("")
    try {
        let UserEvents = await EventModel.find({ userEmail: email })
        let Possible = true
        let PrevEvent = null
        for (let event of UserEvents) {
            let startX = +event.start.split(/\T|\-|\:/).join("")
            let endX = +event.end.split(/\T|\-|\:/).join("")

            if (startTime >= startX && endTime <= endX) {
                Possible = false;
                PrevEvent = event;
                break;
            } else if (startTime >= startX && startTime <= endX) {
                Possible = false
                PrevEvent = event;
                break;
            } else if (endTime >= startX && endTime <= endX) {
                Possible = false
                PrevEvent = event;
                break;
            }
        }
        if (Possible == false) {
            res.json({ Message: "Event Cannot be Created, Overlapping Events", OverlappingEvent: PrevEvent, Created: false });
        } else {
            let instance = new EventModel(req.body)
            await instance.save()
            let userName = await Usermodel.findOne({ email })
            let EmailBody = EventCreatedTemplate(instance, userName.name)
            sendMail("Event has been created", EmailBody, email)
            res.json({ Message: "Event Created Successfully", Created: true })
        }
    } catch (err) {
        console.log(err);
        res.json({ Error: err })
    }
});




//! GET ALL EVENTS> ----------------------------------------------->

EventRouter.get("/allevents", async (req, res) => {
    let userEmail = req.query.userEmail
    try {
        let AllEvents = await EventModel.find({ userEmail });
        res.json({ Message: "Here are all the events", AllEvents });
    } catch (error) {
        console.log(error);
        res.json({ Error: error })
    }
});

//! DELETE AN EVENTS> ----------------------------------------------->
EventRouter.delete("/delete/:id", async (req, res) => {
    let id = req.params.id
    try {
        let Deleted = await EventModel.findOneAndDelete({ _id: id });
        console.log("Deleted an event with id" + id);
        res.json({ Message: "Deleted Successfully", Deleted });
    } catch (error) {
        res.json({ Error: error })
    }
});


module.exports = { EventRouter };