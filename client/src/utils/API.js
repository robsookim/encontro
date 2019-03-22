import axios from "axios";

export default {
    saveMeeting: function(meetingData) {
        return axios.post("/api/meetings", meetingData);
    },

    getMeetings: function(params) {
        return axios.get("/api/meetings");
    }
  };