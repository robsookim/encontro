import React, { Component } from "react";
import { Input, TextArea, FormBtn } from "./../components/Form";

class Form extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isGoing: true,
        numberOfGuests: 2
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
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
          <Input
            value={this.state.date}
            onChange={this.handleInputChange}
            name="date"
            placeholder="Meeting Date"
          />
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