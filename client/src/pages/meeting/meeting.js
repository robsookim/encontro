import React, { Component } from "react";
import Notes from "../meeting/notes";
import Agenda from "../meeting/agenda";
import "./meeting.css";
import chat_placeholder from "../meeting/chat_placeholder.jpeg";
import Chat from "../meeting/chat";
import API from "../../utils/API";

class Meeting extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.updateCurrentNote = this.updateCurrentNote.bind(this);
    this.state = {
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
      }
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;

    API.getMeetingById(id)
      .then(res => {
        // res.data contains all the meeting info we'll want to display in the component
        this.setState({
          meeting: res.data
        });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }
  updateCurrentNote(e) {
    this.setState({
      currentNote: e.target.id
    });
  }

  handleChange(e) {
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
        <Agenda agenda={this.state.agenda} />
        <Notes
          currentNote={this.state.notes[this.state.currentNote]}
          handleChange={this.handleChange}
        />
        {/* <div className="chat">
          <img src={chat_placeholder} width="34%" min-height="900px" />
        </div> */}
        <Chat meetingID={this.props.match.params.id} currentChat={this.state.chat}/>
        {/* <chat_placeholder/> */}
        {/* <div className="chat">
          <img src={chat_placeholder} width="30%" height="auto" />
        </div> */}
      </main>
    );
  }
}

export default Meeting;
