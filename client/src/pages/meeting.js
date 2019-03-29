import React, { Component } from "react";
import Notes from '../meeting/notes';
import '../meeting.css';

class Meeting extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateCurrentNote = this.updateCurrentNote.bind(this);
    this.state = {
      currentNote: 'note0',
      notes: {
        note0: {
          id: 0,
          title: 'Notes',
          text: 'add your notes here',
        },
      },
    };
  }

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
      <main className="app">

        <Notes currentNote={this.state.notes[this.state.currentNote]} handleChange={this.handleChange} />

      </main>

    );
  }; 
}; 

export default Meeting; 