import React, { Component } from "react";
import Notes from '../meeting/notes';
import Agenda from '../meeting/agenda';
import '../meeting/meeting.css';
import API from "./../utils/API.js";

class Meeting extends Component {
  state = {
      title: "",
      date: "",
      time: "",
      agenda: ""
  }
  componentDidMount() {
      const id = this.props.match.params.id;

      API.getMeetingById(id).then(res => {
          // res.data contains all the meeting info we'll want to display in the component
          this.setState({
              title: res.data.title,
              date: res.data.date,
              time: res.data.time,
              agenda: res.data.agenda
          });
      }).catch(err => console.log(err));
  }
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.updateCurrentNote = this.updateCurrentNote.bind(this);
    this.state = {
      currentNote: 'note0',
      notes: {
        note0: {
          id: 0,
          title: 'notes',
          text: ' ',
        },
      },
    };

  }; 

  updateCurrentNote(e) {
    this.setState({
      currentNote: e.target.id
    });
  }

  handleChange(e) {
    const notes = {...this.state.notes};
    const name = e.target.name;
    notes[this.state.currentNote] = {
      ...notes[this.state.currentNote],
      [name]: e.target.value,
    };
    this.setState({notes});
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
        <Notes currentNote={this.state.notes[this.state.currentNote]} handleChange={this.handleChange} /> 
        <Agenda /> 
      </main>

    );
  }
}

export default Meeting;