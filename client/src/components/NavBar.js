import React, { Component } from "react";
import "./navbar.css";

class NavBar extends Component {
  render() {
    return (
      <div
        className="nav-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 50px",
          background: "#ffc673",
          // background: "#fec547",
          color: "white", 
          // borderBottom: "1px solid black",
          marginBottom: "30px",
          alignItems: "center",
          minHeight: "50px"
        }}
      >
      <a href="/"
      style={{color:"white", textDecoration:"none"}}>
        <span
          style={{
            fontSize: "25px",
            fontWeight: "bold"
          }}
        >
          encontro
        </span>
      </a>
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