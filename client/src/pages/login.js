import React, { Component } from "react";
import '../App.css';

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
      return <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
  
            <div className="firstName">
              <label htmlFor="firstName">First Name: </label>
              <input 
                type="text" 
                className=" " 
                placeholder="First Name" 
                name="firstName"
                noValidate
                onChange={this.handleChange}
              /> 
            </div>
  
            <div className="lastName">
              <label htmlFor="lastName">Last Name: </label>
              <input 
                type="text" 
                className=" " 
                placeholder="Last Name" 
                name="lastName"
                noValidate
                onChange={this.handleChange}
              /> 
            </div>
  
            <div className="email">
              <label htmlFor="email">Email: </label>
              <input 
                type="email" 
                className=" " 
                placeholder="Email" 
                name="email"
                noValidate
                onChange={this.handleChange}
              /> 
            </div>
  
            <div className="password">
              <label htmlFor="password">Password: </label>
              <input 
                type="password" 
                className=" " 
                placeholder="Password" 
                name="password"
                noValidate
                onChange={this.handleChange}
              /> 
            </div>
  
            <div className="createAccount">
              <button type="submit">Create Account</button>

              <small>Already Have an Account? Log In</small>
            </div>




            <div className="externalLogin">
            
              <a href="http://localhost:3001/auth/linkedin">Login through LinkedIn</a>
              <a href="http://localhost:3001/auth/google">Login with Google</a>

            </div>
  




          </form>
        </div>
      </div>
    }
  }

export default Login;