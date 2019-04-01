module.exports =()=>{
  const mongoose = require("mongoose");

  // Save a reference to the Schema constructor
  const Schema = mongoose.Schema;
  
  // Using the Schema constructor, create a new NoteSchema object
  // This is similar to a Sequelize model
  const MeetingSchema = new Schema({
    date: { type: Date, default: Date.now },
    time: String,
    title: String,
    agenda: [],
    minutes: [],
    chat:[],
    attendees:[],
    id:Number,
    UserId:String  //meeting can only be started by host
  });
  
  // This creates our model from the above schema, using mongoose's model method
  const Meeting = mongoose.model("Meeting", MeetingSchema);
  return Meeting;
}
