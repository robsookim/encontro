import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
// import API from "./../utils/API.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../join.css';

class Join extends Component {
    render() {
        return (

            <div className="container">
            
                <h1>JOIN A MEETING</h1> 

                {/* <div className="jumbotron"> */}
                    {/* <div className="row">
                        <h1>Join a Meeting</h1>
                    </div> */}

                <h2>Join by ID</h2>

                <div className="row">
                    <div className="meetingName">
                        {/* <h2>Join by ID</h2> */}
                            <form>
                                <div className="form-group">
                                    <label for="meetingNameInput">Meeting Name</label>
                                    <input type="name" className="form-control" id="meetingNameInput" placeholder="meeting name"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Join</button>
                            </form>
                    </div>
                </div>

                <h2>Join Active Meeting</h2>

                <div className="row">
                    <div className="meetingActive">
                        <ul>
                            {/* <li>meeting</li> */}
                        </ul>
                    </div>
                </div>
            </div>
      );
    }
  }

export default Join;