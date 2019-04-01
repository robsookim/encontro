// if the user is logged in, allow them to do whatever

// if not logged in, redirect to the login page

import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
// import API from "./../utils/API.js";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../components/NavBar";
import axios from "axios";
import "./home.css";

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
        <NavBar />
        <div className="container-fluid">

          {/* <div className="jumbotron jumbotron-1 ">
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
          </div> */}

          <div className="section1">
            <h2>Join Meeting</h2>
            <a href="/join">
              <button type="button" className="btn btn-join-meeting">
                →
              </button>
            </a>
          </div>

          <div className="section2">
            {/* <div className="row">
              <h2>Create Meeting</h2>
            </div> */}
            <h2>Create Meeting</h2>
            {/* <div className="row">
              <a href="/create">
                <button type="button" className="btn btn-create">
                  +
                </button>
              </a>
            </div> */}
            <a href="/create">
              <button type="button" className="btn btn-create-meeting">
                +
              </button>
            </a>
          </div>
          <div className="section3">

            <h2>Organizations</h2>
            <a href="/organization">
              <button type="button" className="btn btn-organization">
              <i class="fas fa-sitemap"></i>
              </button>
            </a>
          </div>
          <div className="section4">

            <h2>Invitations</h2>
            <a href="/invitations">
              <button type="button" className="btn btn-invitation">
              <i class="fas fa-paper-plane"></i>              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
