import axios from "axios";

export default {
    saveMeeting: function(meetingData) {
        return axios.post("/api/meetings", meetingData);
    }
  };