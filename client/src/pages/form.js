import React, { Component } from "react";
import { Input, TextArea, FormBtn } from "./../components/Form";
import API from "./../utils/API.js";

class Form extends Component {
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
  
    handleInputChange(event) {
      let {name: fieldName, value} = event.target;
  
      this.setState({
        [fieldName]: value
      });
    }

    handleFormSubmit(event) {
      event.preventDefault();
      const meeting = {
        title: this.state.title,
        date: this.state.date,
        time: this.state.time,
        agenda: this.state.agenda
      }  

      API.saveMeeting(meeting)
      .then(res => 
        console.log("REACT saved the meeting")
      ).catch(err => console.log(err));
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
          {/* should change this to a date format? */}
          <Input
            value={this.state.date}
            onChange={this.handleInputChange}
            name="date"
            placeholder="Meeting Date"
          />
          {/* change this to time format? */}
          <TextArea
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
            Set Meeting
          </FormBtn>
        </form>
      );
    }
  }

export default Form;