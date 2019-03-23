import React, { Component } from "react";
import API from "./../utils/API.js";

class Meeting extends Component {
    state = {
        title: ""
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        API.getMeetingById(id).then(res => {
            // res.data contains all the meeting info we'll want to display in the component
            console.log(res.data);
            this.setState({
                title: res.data.title
            });
        }).catch(err => console.log(err));
    }

  
    render() {
      return (
        <div>
            <span>looking for one particular meeting...</span>
            <h1>{this.state.title}</h1>
        </div>
      );
    }
  }

export default Meeting;