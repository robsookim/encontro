import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
// import API from "./../utils/API.js";

class Login extends Component {
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
                <a href="http://localhost:3001/auth/linkedin">CLICK HERE for linkedin login</a>
                <br></br>
                <a href="http://localhost:3001/auth/google">CLICK HERE for google login</a>
            </div>
      );
    }
  }

export default Login;