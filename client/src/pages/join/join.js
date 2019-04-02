import React, { Component } from "react";
import API from "../../utils/API";
import NavBar from "../../components/NavBar";
import axios from "axios";
import "./join.css";

class Join extends Component {
  state = {
    meetings: [],
    hostedMeetings: [],
    userName:"",
    picture:""
  };

  componentDidMount() {
    this.getMeetings();
    this.getHostedMeetings();
    axios.get("/api/userinfo").then(res=>{
      this.setState({
        userName:res.data.name,
        picture:res.data.picture
      })
    })
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
        <NavBar proPic={this.state.picture} userName={this.state.userName}/>

        <div className="join-container">

            <h1 className="titleJoinMeeting">Join a Meeting</h1>

            <div className="join-form-wrapper">
            
              <h2 className="subtitleJoinMeeting">Join Active Meeting</h2>

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

              <h2 className="subtitleJoinMeeting">Hosted Meetings</h2>

              <div className="rowThree">
                <div className="meetingHosted">
                    {this.state.hostedMeetings.length ? (
                      <ul>
                        {this.state.hostedMeetings.map(meeting => (
                          <li key={meeting.id}>
                            <div onClick={this.startMeeting.bind(this, meeting.id)}>
                              <strong>{meeting.title}</strong>
                            </div>
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

      </div>
    );
  }
}

export default Join;