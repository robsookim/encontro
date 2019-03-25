import React, { Component } from "react";
import API from "./../utils/API.js";

class Meeting extends Component {
    state = {
        title: "",
        date: "",
        time: "",
        agenda: ""
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        API.getMeetingById(id).then(res => {
            // res.data contains all the meeting info we'll want to display in the component
            this.setState({
                title: res.data.title,
                date: res.data.date,
                time: res.data.time,
                agenda: res.data.agenda
            });
        }).catch(err => console.log(err));
    }

  
    render() {
      return (
        <div>
            <h1>Meeting Details</h1>
            <h1>{this.state.title}</h1>
            <h3>{this.state.date}</h3>
            <h3>{this.state.time}</h3>
            <p>{this.state.agenda}</p>
        </div>
      );
    }
  }

export default Meeting;