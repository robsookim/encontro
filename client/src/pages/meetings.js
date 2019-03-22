import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
import API from "./../utils/API.js";

class Meetings extends Component {
  state = {
    meetings: []
  };
    // constructor(props) {
    //   super(props);
  
    //   this.handleInputChange = this.handleInputChange.bind(this);
    //   this.handleFormSubmit = this.handleFormSubmit.bind(this);
    // }

    getMeetings = () => {
      API.getMeetings()
        .then(res => {
          console.log("got some meetings...")
          console.log(res.data)

        // setState to the array of meetings in the DB
        // then display that array on the page
        // little overly simple but good until we have a more sophisticated React component for this
        
        //   res.json(res.data)
        //   this.setState({
        //       meetings: res.data
        //   });
        })
        .catch(err => console.log(err));
    };

  
    render() {
        this.getMeetings();
      return (
        <div>
            <span>looking for some meetings...</span>
        </div>
      );
    }
  }

export default Meetings;