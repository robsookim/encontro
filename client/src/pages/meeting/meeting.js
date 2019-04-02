import React, { Component } from "react";
import Notes from "../meeting/notes";
import Agenda from "../meeting/agenda";
import "./meeting.css";
import NavBar from "../../components/NavBar";
// import chat_placeholder from "../meeting/chat_placeholder.jpeg";
import Chat from "../meeting/chat";
import API from "../../utils/API";

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
        chat: []
      },
      chat:[]
    };

  componentDidMount() {
    const id = this.props.match.params.id;

    API.getMeetingById(id)
      .then(res => {
        // res.data contains all the meeting info we'll want to display in the component
        this.setState({
          meeting: res.data,
          chat:res.data.chat
        });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }
  updateCurrentNote = (e)=> {
    this.setState({
      currentNote: e.target.id
    });
  }

  handleChange =(e) =>{
    const notes = { ...this.state.notes };
    const name = e.target.name;
    notes[this.state.currentNote] = {
      ...notes[this.state.currentNote],
      [name]: e.target.value
    };
    this.setState({ notes });
  }

  render() {
    return (
      // <div className="meetingDetails">
      //   <h1>Meeting Details</h1>
      //   <h1>{this.state.title}</h1>
      //   <h3>{this.state.date}</h3>
      //   <h3>{this.state.time}</h3>
      //   <p>{this.state.agenda}</p>
      // </div>

      <main className="app">

        <NavBar /> 

        <div className="timeSection">
          <div className="timeStart">start time:</div>
          <div className="timeDuration">duration time:</div>
          <div className="timeLeft">time teft:</div>
        </div>

        <div className="mainApp">
        
          <Agenda agenda={this.state.meeting.agenda} />
          <Notes
            currentNote={this.state.notes[this.state.currentNote]}
            handleChange={this.handleChange}
          /> 
          <Chat meetingID={this.props.match.params.id} currentChat={this.state.chat}/>

        </div>

        <div className ="endButtons">

          <button className="saveNotesButton">
            Save Notes
          </button>

          <button className="endMeetingButton">
            End Meeting
          </button>

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