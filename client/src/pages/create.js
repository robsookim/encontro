import React, { Component } from "react";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API.js";

class Create extends Component {
  state = {
    title: "",
    date: "",
    time: "",
    agenda: ""
    // attendees: []
  };
    constructor(props) {
      super(props);
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    getMeetings = () => {
      API.getMeetings()
        .then(res =>
          console.log("got some meetings")
        ) 
        .catch(err => console.log(err));
    };
  
    handleInputChange(event) {
      let {name: fieldName, value} = event.target;
  
      this.setState({
        [fieldName]: value
      });
    }

    handleFormSubmit(event) {
      event.preventDefault();
      console.log("form has been submitted");
      const meeting = {
        title: this.state.title,
        date: this.state.date,
        time: this.state.time,
        agenda: this.state.agenda
      }

      this.setState({
        title: "",
        date: "",
        time: "",
        agenda: ""
      })

      API.saveMeeting(meeting)
      .then(res => {
        console.log("REACT saved the meeting")
        // this.getMeetings()
        this.props.history.push("/meetings");
      }).catch(err => console.log(err));
    }
  
    render() {
      return (
        <form>
          <Input
            value={this.state.title}
            onChange={this.handleInputChange}
            name="title"
            placeholder="Meeting Title"
          />
          {/* should change this to a "select a date" format? */}
          <Input
            value={this.state.date}
            onChange={this.handleInputChange}
            name="date"
            placeholder="Meeting Date"
          />
          {/* change this to "select a time" format? */}
          <Input
            value={this.state.time}
            onChange={this.handleInputChange}
            name="time"
            placeholder="Meeting Time"
          />
          <TextArea
            value={this.state.agenda}
            onChange={this.handleInputChange}
            name="agenda"
            placeholder="Agenda"
          />
          <FormBtn
            disabled={!(this.state.title)}
            onClick={this.handleFormSubmit}
          >
            Schedule Meeting
          </FormBtn>
        </form>
      );
    }
  }

export default Create;