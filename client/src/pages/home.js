// if the user is logged in, allow them to do whatever

// if not logged in, redirect to the login page

import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
// import API from "./../utils/API.js";

class Home extends Component {
  
    render() {
        return (
            <div>
                <a href="http://localhost:3000/login">CLICK HERE to see login options</a>
                <br></br>
                <a href="http://localhost:3000/form">CLICK HERE to go straight to the meeting form</a>
                <br></br>
                <a href="http://localhost:3000/meetings">CLICK HERE to see all the meetings</a>
                <br></br>
                <a href="http://localhost:3000/users">CLICK HERE to see all the users</a>

            </div>
      );
    }
  }

export default Home;