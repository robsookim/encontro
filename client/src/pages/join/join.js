import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
import API from "../../utils/API";
import NavBar from "../../components/NavBar";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./join.css";

class Join extends Component {
  state = {
    meetings: [],
    hostedMeetings: []
  };

  componentDidMount() {
    this.getMeetings();
    this.getHostedMeetings();
  }

  getMeetings = () => {
    API.getMeetings()
      .then(res => {
        this.setState({ meetings: res.data });
      })
      .catch(err => console.log(err));
  };
  getHostedMeetings = () => {
    API.getHostedMeetings()
      .then(res => {
        this.setState({ hostedMeetings: res.data });
      })
      .catch(err => console.log(err));
  };
  startMeeting=(id, e)=>{
    API.startMeeting(id).then(res=>{
      console.log(res);
      window.location.href="/meeting/"+res.data.id
    })
  }

  render() {
    return (
      <div className="join-wrapper">
        <NavBar />

        <div className="join-container">

            <h1 className="titleJoinMeeting">join a meeting</h1>

            <div className="join-form-wrapper">
            
              {/* <h2 className="subtitleJoinMeeting">✖︎ Join by ID ✖︎</h2>
              <div className="rowOne">
                <div className="meetingName"> */}
                  {/* <h2>Join by ID</h2> */}
                  {/* <form className="meetingNameForm">
                    <div className="form-group">
                      <label for="meetingNameInput">Enter Meeting ID:</label>
                      <input
                        type="name"
                        className="form-control"
                        id="meetingNameInput"
                        placeholder="meeting ID"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Join
                    </button>
                  </form>
                </div>
              </div> */}

              <h2 className="subtitleJoinMeeting">✖︎ Join Active Meeting ✖︎</h2>

              <div className="rowTwo">
                <div className="meetingActive">
                  <ul>
                    {this.state.meetings.length ? (
                      <ul>
                        {this.state.meetings.map(meeting => (
                          <li key={meeting.id}>
                            <a href={"/meeting/" + meeting.id}>
                              <strong>{meeting.title}</strong>
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

              <h2 className="subtitleJoinMeeting">✖︎ Hosted Meetings ✖︎</h2>

              <div className="rowThree">
                <div className="meetingHosted">
                  <ul>
                    {this.state.hostedMeetings.length ? (
                      <ul>
                        {this.state.hostedMeetings.map(meeting => (
                          <li key={meeting.id}>
                            <a href={"/meeting/" + meeting.id}>
                              <strong>{meeting.title}</strong>
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>You are not the host of any meetings</p>
                    )}
                  </ul>
                </div>
              </div>
                          
            </div>

        </div>

      </div>
    );
  }
}

export default Join;
