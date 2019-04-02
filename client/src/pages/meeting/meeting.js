import React, { Component } from "react";
import Notes from "../meeting/notes";
import Agenda from "../meeting/agenda";
import "./meeting.css";
import NavBar from "../../components/NavBar";
// import chat_placeholder from "../meeting/chat_placeholder.jpeg";
import Chat from "../meeting/chat";
import API from "../../utils/API";
import axios from "axios";
class Meeting extends Component {
  state = {
    currentNote: "note0",
    notes: {
      note0: {
        id: 0,
        title: "notes",
        text: " "
      }
    },
    meeting: {
      title: "",
      date: "",
      time: "",
      agenda: [],
      chat: [],
      timeStart:"",
      duration:""
    },
    chat: []
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    API.getMeetingById(id)
      .then(res => {
        // res.data contains all the meeting info we'll want to display in the component
        this.setState({
          meeting: res.data,
          chat: res.data.chat
        });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }

  updateCurrentNote = e => {
    this.setState({
      currentNote: e.target.id
    });
  };
  crossOutItem = (parent, me, e) => {
    let agendaStateCopy = this.state.meeting.agenda.slice(0);
    let location = agendaStateCopy;
    for (let p of parent) {
      location = location[p].items;
    }

    location[me].completed = !location[me].completed;
    axios.put("/meeting/live/editagenda", agendaStateCopy).then(res => {
      this.setState({
        meeting: res.data
      });
    });
  };
  handleChange = e => {
    const notes = { ...this.state.notes };
    const name = e.target.name;
    notes[this.state.currentNote] = {
      ...notes[this.state.currentNote],
      [name]: e.target.value
    };
    this.setState({ notes });
  };

  render() {
    const timeStart = this.state.meeting.timeStart;
    const hour = timeStart.length===8?Number(timeStart.slice(0, 2)):Number(timeStart.slice(0, 1));
    const min = timeStart.length===8?Number(timeStart.slice(3, 5)):Number(timeStart.slice(2, 4));
    const duration = this.state.meeting.duration;
    const durationHour = Number(duration.slice(0, 2));
    const durationMin = Number(duration.slice(3, 5));
    const timeEndMin = (min + durationMin) % 60;
    const timeEndHour =
      Math.floor((min + durationMin) / 60) + hour + durationHour;

    const timeEnd = timeEndHour.toString()+":"+((timeEndMin>9)?"":"0")+timeEndMin.toString();
    return (
      <main className="app">
        <NavBar />

        <div className="timeSection">
          <div className="timeStart">start time: {timeStart}</div>
          <div className="timeDuration">duration time: {duration}</div>
          <div className="timeLeft">time end: {timeEnd}</div>
        </div>

        <div className="mainApp">
          <Agenda
            crossOutItem={this.crossOutItem}
            agenda={this.state.meeting.agenda}
          />
          <Notes
            currentNote={this.state.notes[this.state.currentNote]}
            handleChange={this.handleChange}
          />
          <Chat
            meetingID={this.props.match.params.id}
            currentChat={this.state.chat}
          />
        </div>

        <div className="endButtons">
          <button className="saveNotesButton">Save Notes</button>

          <button className="endMeetingButton">End Meeting</button>
        </div>

        {/* <div className="chat">
          <img src={chat_placeholder} width="34%" min-height="900px" />
        </div> */}

        {/* <chat_placeholder/> */}
        {/* <div className="chat">
          <img src={chat_placeholder} width="30%" height="auto" />
        </div> */}
      </main>
    );
  }
}

export default Meeting;
