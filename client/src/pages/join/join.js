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
    })
  }

  render() {
    return (
      <div>
        <NavBar
          searchVal={this.state.orgSearchValue}
          searchType={this.state.orgSearchType}
          typeSwitch={this.changeSearchType}
          joinOrg={this.joinOrg}
          createOrg={this.createOrg}
          onSearchType={this.updateSearch}
        />

        <div className="join-container">

            <h1 className="titleMeeting">JOIN A MEETING</h1>

            <h2>Join by ID</h2>

            <div className="row">
              <div className="meetingName">
                {/* <h2>Join by ID</h2> */}
                <form>
                  <div className="form-group">
                    <label for="meetingNameInput">Meeting Name</label>
                    <input
                      type="name"
                      className="form-control"
                      id="meetingNameInput"
                      placeholder="meeting name"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Join
                  </button>
                </form>
              </div>
            </div>

            <h2>Join Active Meeting</h2>

            <div className="row">
              <div className="meetingActive">
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
              </div>
            </div>
            <h2>Begin your Meeting</h2>

            <div className="row">
              <div className="meetingHosted">
                  {this.state.hostedMeetings.length ? (
                    <ul>
                      {this.state.hostedMeetings.map(meeting => (
                        <li key={meeting.id}>
                          <span onClick={this.startMeeting.bind(this,meeting.id)}>
                            <strong>{meeting.title}</strong>
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>You are not the host of any meetings</p>
                  )}
              </div>
            </div>

        </div>

      </div>
    );
  }
}

export default Join;
