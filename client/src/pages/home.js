// if the user is logged in, allow them to do whatever

// if not logged in, redirect to the login page

import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
// import API from "./../utils/API.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <h1>Encontro</h1>
          <div className="jumbotron jumbotron-1 ">
            <h2>Join Meeting</h2>
            <a href="/join"><button type="button" className="btn btn-join">→</button></a>
            </div>
          <div className="jumbotron jumbotron-2">
            <h2>Create Meeting</h2>
            <a href="/create"><button type="button" className="btn btn-create">+</button></a>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;