import axios from "axios";

export default {
    saveMeeting: function(meetingData) {
        return axios.post("/api/meetings", meetingData);
    },

    getMeetings: function() {
        return axios.get("/api/meetings");
    },

    getUsers: function() {
        return axios.get("/api/users");
    }
  };