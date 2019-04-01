import React, { Component } from "react";
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
          // borderBottom: "1px solid black",
          marginBottom: "30px",
          alignItems: "center",
          minHeight:"50px"
        }}
      >
        <span
          style={{
            fontSize: "25px",
            fontWeight: "bold"
          }}
        >
          encontro
        </span>
        <a
          href="/auth/logout"
          style={{
            textDecoration: "none"
          }}
        >
          <span>Log out</span>
        </a>
      </div>
    );
  }
}

export default NavBar;
