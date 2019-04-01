// if the user is logged in, allow them to do whatever

// if not logged in, redirect to the login page

import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
// import API from "./../utils/API.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../home.css";
import NavBar from "../components/NavBar.js";
import axios from "axios";

class Home extends Component {
  state = {
    orgSearchType: "join",
    orgSearchValue: ""
  };

  changeSearchType = event => {
    this.setState({
      orgSearchType: this.state.orgSearchType === "join" ? "create" : "join"
    });
  };
  updateSearch = event=>{
    this.setState({
      orgSearchValue:event.target.value
    })
  }
  joinOrg = event => {
    axios.put("/api/organization", {orgInp:this.state.orgSearchValue}).then(res => {
      if (res.status === 200) {
        window.alert(`Organization ${res.data} joined!`);
      } else {
        window.alert("Could not join organization!");
      }
    });
  };
  createOrg = event => {
    axios.post("/api/organization", {orgInp:this.state.orgSearchValue}).then(res => {
      if (res.status === 200) {
        window.alert(`Organization ${res.data} created!`);
      } else {
        window.alert("Could not create organization!");
      }
    });
  };

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
        <div className="container-fluid">
          <div className="jumbotron jumbotron-1 ">
            <h2>Join Meeting</h2>
            <a href="/join">
              <button type="button" className="btn btn-join">
                →
              </button>
            </a>
          </div>
          <div className="jumbotron jumbotron-2">
            <h2>Create Meeting</h2>
            <a href="/create">
              <button type="button" className="btn btn-create">
                +
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
