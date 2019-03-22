// if the user is logged in, allow them to do whatever

// if not logged in, redirect to the login page

import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
// import API from "./../utils/API.js";

class Home extends Component {
  state = {
    
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
    }
  
    render() {
        return (
            <div>
                <a href="http://localhost:3000/login">CLICK HERE to see login options</a>
                <br></br>
                <a href="http://localhost:3000/form">CLICK HERE to go straight to the meeting form</a>

            </div>
      );
    }
  }

export default Home;