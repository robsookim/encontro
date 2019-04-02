import axios from "axios";

export default {
    saveMeeting: function(meetingData) {
        return axios.post("/api/meetings", meetingData);
    },

    getMeetingById: function(meetingID) {
        return axios.post("/meeting/id", {id:meetingID});
    },

    getMeetings: function() {
        return axios.get("/api/meetings");
    },
    getHostedMeetings: function() {
        return axios.get("/api/meetings/ashost");
    },

    getUsers: function() {
        return axios.get("/api/users");
    },
    startMeeting:function(id){
        return axios.put("/meeting/start", {id:id})
    }
  };