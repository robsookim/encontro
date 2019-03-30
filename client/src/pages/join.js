import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
import API from "./../utils/API.js";
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../join.css';

class Join extends Component {
    state = {
        meetings: []
      };

      componentDidMount() {
        this.getMeetings();
      }

      getMeetings = () => {
        API.getMeetings()
          .then(res => {
            this.setState({ meetings: res.data })
          })
        .catch(err => console.log(err));
      }

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
                                {this.state.meetings.length ? (
                                <ul>
                                    {this.state.meetings.map(meeting => (
                                    <li key={meeting.id}>
                                        <a href={"/meeting/" + meeting.id}>
                                        <strong>
                                            {meeting.title}
                                        </strong>
                                        </a>
                                    </li>
                                    ))}
                                </ul>
                                ) : (
                                <p>No Active Meetings</p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            
      );
    }
  }

export default Join;