import React, { Component } from "react";
import '../App.css';

// import { Input, TextArea, FormBtn } from "./../components/Form";
// import API from "./../utils/API.js";

const emailReject = RegExp (
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = formErrors => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  return valid; 
}

class Login extends Component {

  state = {
    
  };

  constructor(props) {
    super(props);
    
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {
    let {name: fieldName, value} = event.target;

    this.setState({
      [fieldName]: value
    });
  };

  handleFormSubmit(event) {
    event.preventDefault();
  };

  handleSubmit = e => {
    e.preventDefault();

    if(formValid(this.state)) {
      console.log(`        
      --SUBMITTING--
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Email: ${this.state.email}
      Password: ${this.state.password}
      `); 
    } else {
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE'); 
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target; 
    let formErrors = { ...this.state.formErrors }; 

    switch (name) {
      case "firstName":
        formErrors.firstName = 
          value.length < 3 ? "minimum 3 characters required" : "";
        break;

      case "lastName": 
        formErrors.lastName = 
          value.length < 2 ? "minimum 2 characters required" : "";
        break;

        case "email":
        formErrors.email = emailReject.test(value)
          ? "" 
          : "invalid email address";
        break;

      case "password": 
        formErrors.password = 
          value.length < 7 ? "minimum 7 characters required" : "";
        break;

      default:
        break; 
    }
    this.setState({ formErrors, [name] : value }, () => console.log(this.state)); 
  };

  render () {
    const { formErrors } = this.state; 
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>

            <div className="firstName">
              <label htmlFor="firstName">First Name: </label>
              <input 
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name" 
                type="text" 
                name="firstName"
                noValidate
                onChange={this.handleChange}
              /> 
              {formErrors.firstName.length > 0 && (
                <span className="error message">{formErrors.firstName}</span>
              )}
            </div>

            <div className="lastName">
              <label htmlFor="lastName">Last Name: </label>
              <input 
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name" 
                type="text" 
                name="lastName"
                noValidate
                onChange={this.handleChange}
              /> 
              {formErrors.lastName.length > 0 && (
                <span className="error message">{formErrors.lastName}</span>
              )}
            </div>

            <div className="email">
              <label htmlFor="email">Email: </label>
              <input 
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email" 
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              /> 
              {formErrors.email.length > 0 && (
                <span className="error message">{formErrors.email}</span>
              )}
            </div>

            <div className="password">
              <label htmlFor="password">Password: </label>
              <input 
                className={formErrors.password.length > 0 ? "error" : null} 
                placeholder="Password" 
                type="password" 
                name="password"
                noValidate
                onChange={this.handleChange}
              /> 
              {formErrors.password.length > 0 && (
                <span className="error message">{formErrors.password}</span>
              )}
            </div>

            <div className="createAccount">
              <button type="submit">Create Account</button>
              {/* <button type="login">Already Have an Account? Log In</button> */}
              <small>Already Have an Account? Log In</small> 
            </div>

            <div className="externalLogin">
              <div className="linkedInLogin">
                <a href="http://localhost:3001/auth/linkedin">Login with LinkedIn </a>
              </div>
              <div className="googleLogin">
                <a href="http://localhost:3001/auth/google">Login with Google</a>
              </div>
            </div>

          </form>
        </div>
      </div>
    ); 
  };

}; 

export default Login;