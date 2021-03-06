module.exports =()=>{
  const mongoose = require("mongoose");
  // Save a reference to the Schema constructor
  const moment = require("moment");
  const Schema = mongoose.Schema;
  
  // Using the Schema constructor, create a new NoteSchema object
  // This is similar to a Sequelize model
  const MeetingSchema = new Schema({
    date: { type: Date, default: Date.now },
    dateStart:{type:String, default:moment().format("YYYY-MM-DD")},
    time: String,
    timeStart:{type:String, default:moment().format("LT")},
    title: String,
    agenda: [],
    minutes: [],
    chat:[],
    OrganizationId:Number,
    attendees:[],
    id:Number,
    UserId:String,  //meeting can only be started by host,
    duration:{type:String, default:"00:30"}
  });
  
  // This creates our model from the above schema, using mongoose's model method
  const Meeting = mongoose.model("Meeting", MeetingSchema);
  return Meeting;
}
