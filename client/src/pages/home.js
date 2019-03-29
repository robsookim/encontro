// if the user is logged in, allow them to do whatever

// if not logged in, redirect to the login page

import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
// import API from "./../utils/API.js";

class Home extends Component {
  
    render() {
        return (
            <div>

                <a href="http://localhost:3000/login">CLICK to see login or create account options</a>
                <br></br>
                <a href="http://localhost:3000/create">CLICK to go straight to create a new meeting</a>
                <br></br>
                <a href="http://localhost:3000/join">CLICK to join an existing meeting</a>
                <br></br>
                <a href="http://localhost:3000/users">CLICK  to see all the users</a>
                <br></br>
                <a href="http://localhost:3000/meeting">click to see the meeting page once a part of a meeting</a>

            </div>
      );
    }
  }

export default Home;