import React, { Component } from "react";
import API from "./../utils/API.js";

class Organization extends Component {
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
          console.log(res);

          this.setState({
              title: res.data.title,
              date: res.data.date,
              time: res.data.time,
              agenda: res.data.agenda
          });
          console.log(this.state);
      }).catch(err => console.log(err))
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
      <div className="org-page">
        <Agenda /> 
        <Notes currentNote={this.state.notes[this.state.currentNote]} handleChange={this.handleChange} /> 
        <div className="chat">
          <img src={chat_placeholder} width="34%" min-height="900px" />
        </div>
      </div>

    );
  }
}

export default Organization;