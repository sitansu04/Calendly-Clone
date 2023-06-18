// title, place, start, end, event_link, description 
const mongoose = require("mongoose");
const eventSchema = mongoose.Schema({
    userEmail: { type: String, required: true },
    title: { type: String, required: true },
    place: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    color: { type: String, required: true },
    createdOn: { type: String, required: true },
    event_link: { type: String, required: true },
    description: { type: String, required: true },
});

const EventModel = mongoose.model("Events", eventSchema);
module.exports = { EventModel };
