const express = require("express");
const moment = require("moment");
const { Usermodel } = require("../models/user.model");
const { sendMail } = require("../config/mail");
const WorkflowCreatedTemplate = require("../config/workflowstemplate");

let WorkFlowRouter = express.Router();

WorkFlowRouter.post("/create", async (req, res) => {
  let workflow = req.body
  let email = req.body.userEmail
  try {
    let userName = await Usermodel.findOne({ email })
    const EmailBody = WorkflowCreatedTemplate(workflow, userName.name)
    sendMail("WorkFlow Scheduled", EmailBody, email)
    res.json({ Message: "Workflow Created Successfully", Created: true });
  } catch (err) {
    console.log(err);
    res.json({ Error: err })
  }
});



WorkFlowRouter.post("/notifyhost/:beforetime", (req, res) => {
  let { subject, body, schduledDateTime, userMail } = req.body;
  let beforeSeconds = req.params.beforetime;

  // calculating difference between date and timein sec
  function calculateSeconds(startDate, endDate) {
    var start_date = moment(startDate, "YYYY-MM-DD hh:mm A");
    var end_date = moment(endDate, "YYYY-MM-DD hh:mm A");
    var duration = moment.duration(end_date.diff(start_date));
    var seconds = duration.asSeconds();
    return seconds;
  }
  // providing current DateTime and end DateTime
  var CurrentDateTime = moment().format("YYYY-MM-DD hh:mm A");
  let totalSeconds = calculateSeconds(CurrentDateTime, schduledDateTime);

  // decresing the time user wants to get notification from the schduled time/start DateTime
  let sendingNotificationMailSec = totalSeconds * 1000 - beforeSeconds * 1000;

  // console.log(sendingNotificationMailSec);
  if (sendingNotificationMailSec >= 0) {
    setTimeout(() => {
      sendMail(subject, body, userMail);
    }, sendingNotificationMailSec);
    res.send({
      msg: "Workflow Created",
      remaining: sendingNotificationMailSec,
      currenttime: CurrentDateTime
    });
  } else {
    res.status(400);
    res.send("The time you selected is not valid.");
  }
});

// calculating difference between date and timein sec
function calculateSeconds(startDate, endDate) {
  var start_date = moment(startDate, "YYYY-MM-DD hh:mm A");
  var end_date = moment(endDate, "YYYY-MM-DD hh:mm A");
  var duration = moment.duration(end_date.diff(start_date));
  var seconds = duration.asSeconds();
  return seconds;
}

module.exports = { WorkFlowRouter };
