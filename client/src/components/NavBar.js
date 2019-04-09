import React, { Component } from "react";
import "./navbar.css";

class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">

        <span className="nav-bar-title"> encontro </span>
        
        <div>
          <img src={this.props.proPic} style={{height:"30px", width:"30px", borderRadius:"10px", marginRight:"10px"}}/>
          <a
            href="/auth/logout"
            style={{
              textDecoration: "none"
            }}
          >
            <span>Log out</span>
          </a>
        </div>
      </div>
    );
  }
}

export default NavBar;