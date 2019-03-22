import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
import API from "./../utils/API.js";

class Users extends Component {
  state = {
    users: []
  };

    getUsers = () => {
      API.getUsers()
        .then(res => {
          console.log("got some users...")
          console.log(res.data)
        })
        .catch(err => console.log(err));
    };

  
    render() {
        this.getUsers();
      return (
        <div>
            <span>looking for some users...</span>
        </div>
      );
    }
  }

export default Users;