import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
// import API from "./../utils/API.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../join.css';

class Join extends Component {
  
    render() {
        return (
            <div>
                <div className="container">
                    <div className="jumbotron">
                        <h1>Join a Meeting</h1>
                        <div className="meetingName">
                            <h2>Join by ID</h2>
                                <form>
                                    <div className="form-group">
                                        <label for="meetingNameInput">Meeting Name</label>
                                        <input type="name" className="form-control" id="meetingNameInput" placeholder="enter meeting name"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Join</button>
                                </form>
                        </div>

                        <hr></hr>

                        <h2>Join Active Meeting</h2>
                        <div className="meetingActive">
                            <ul>
                                <li>dummy meeting 1</li>
                                <li>dummy meeting 2</li>
                                <li>Pat smells meeting</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            
      );
    }
  }

export default Join;