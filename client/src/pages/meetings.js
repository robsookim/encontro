import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
import API from "./../utils/API.js";

class Meetings extends Component {
  state = {
    meetings: [
      {
        id: "1",
        title: "meeting 1",
        date: "march 25, 2019",
        time: "7:30pm",
        agenda: "do some stuff"
      },
      {
        id: "2",
        title: "meeting 2",
        date: "march 30, 2019",
        time: "9:00pm",
        agenda: "do more stuff"
      }
  ]
  };

  componentDidMount() {
    // this.getMeetings();
  }

  getMeetings = () => {
    API.getMeetings()
      .then(res => {
        console.log("got some meetings...")
        console.log(res.data)
        this.setState({ meetings: res.data })
      })
    .catch(err => console.log(err));
  }
  
  render() {
    return (
      <div>
        <span>looking for some meetings...</span>
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
              <h3>No Results to Display</h3>
            )}
          </ul>
      </div>
    );
  }
}

export default Meetings;