import React, { Component } from "react";
class NavBar extends Component {
  render() {
    return (
      <div
        className="nav-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 30px",
          background: "#ffc673",
          // borderBottom: "1px solid black",
          marginBottom: "30px",
          alignItems: "center"
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "400px"
          }}
        >
          <span onClick={this.props.typeSwitch}>
            org {this.props.searchType}
          </span>
          <input
            className="org-input"
            placeholder={
              this.props.searchType === "join"
                ? "Enter ID!"
                : "Enter New Org Name"
            }
            onChange={this.props.onSearchType}
          />
          <button
            style={{
              width: "auto",
              padding: "0 10px",
              borderRadius: "8px"
            }}
            onClick={
              this.props.searchType === "join"
                ? this.props.joinOrg
                : this.props.createOrg
            }
          >
            {this.props.searchType}
          </button>
        </div>
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
