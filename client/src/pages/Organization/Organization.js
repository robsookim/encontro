import React, { Component } from "react";
import API from "../../utils/API.js";
import OrganizationForm from "../../components/OrganizationForm/OrganizationForm.js";
import OrganizationJoin from "../../components/OrganizationForm/OrganizationJoin.js";
import axios from "axios";
import NavBar from "../../components/NavBar";
import "./Organization.css";

class Organization extends Component {
  state = {
    newOrganization: {
      orgName: "",
      orgSecret: "",
      orgApproval: 0
    },
    joinOrganization: {
      orgId: "",
      orgSecret: ""
    },
    userName: "",
    picture: "",
    orgMeetings: [],
    orgMembers: [],
    orgName:null
  };
  componentDidMount() {
    axios.get("/api/userinfo").then(res => {
      this.setState({
        userName: res.data.name,
        picture: res.data.picture
      });
    });
    axios.get("/api/all/meetings").then(res => {
      console.log(res.data);
      this.setState({
        orgMeetings: res.data
      });
    });
    axios.get("/api/all/members").then(res => {
      console.log(res.data);
      this.setState({
        orgMembers: res.data.users,
        orgName:res.data.orgName
      });
    });
  }
  handleChangeNewOrg = e => {
    const newOrg = this.state.newOrganization;
    newOrg[e.target.name] = e.target.value;
    this.setState({ newOrganization: newOrg });
  };
  handleChangeJoinOrg = e => {
    const joinOrg = this.state.joinOrganization;
    joinOrg[e.target.name] = e.target.value;
    this.setState({ joinOrganization: joinOrg });
  };
  handleFormSubmitNewOrg = e => {
    e.preventDefault();
    console.log(this.state.newOrganization);
    axios.post("/api/organization", this.state.newOrganization).then(res => {
      this.setState({
        newOrganization: {
          orgName: "",
          orgSecret: "",
          orgApproval: 0
        }
      });
      if (res.status === 200) {
        window.alert(`Organization ${res.data} created!`);
        window.location.href = "/";
      } else {
        window.alert("Could not create organization!");
      }
    });
  };
  handleFormSubmitJoinOrg = e => {
    e.preventDefault();
    console.log(this.state.joinOrganization);
    axios.put("/api/organization", this.state.newOrganization).then(res => {
      this.setState({
        joinOrganization: {
          orgId: "",
          orgSecret: ""
        }
      });
    });
  };

  render() {
    return (
      <div className="org-page">

        <NavBar proPic={this.state.picture} userName={this.state.userName} />
        
        <div
          className="flex-row"
          style={{
            minWidth: "800px",
            marginBottom: "20px",
            alignItems: "flex-start"
          }}
        >

          <div
            className="flex-column"
            style={{
              width: "50%",
              height: "100%",
              borderRight: "1px solid #ff8566"
            }}
          >

            <OrganizationForm
              handleFormSubmit={this.handleFormSubmitNewOrg}
              formState={this.state.newOrganization}
              changeOrgFormValue={this.handleChangeNewOrg}
              width="100%"
              height="auto"
            />
            
            <OrganizationJoin
              handleFormSubmit={this.handleFormSubmitJoinOrg}
              formState={this.state.joinOrganization}
              changeOrgFormValue={this.handleChangeJoinOrg}
              width="100%"
              height="auto"
            />

          </div>

          <div 
            className="flex-column" 
            style={{ 
              width: "50%", 
              height: "100%"
              // borderLeft: "1px solid #ff8566"
            }}
          >
            
            <div
              className="org-display-wrapper flex-column"
              style={{ width: "93%" }}
            >

              <h2 className="orgH2Titles">{this.state.orgName||"Your Organization"}</h2>

              <div className="flex-column" style={{ width: "100%" }}>
                <div
                  className="flex-column"
                  style={{ width: "100%", height: "auto" }}
                >

                  <h3 lassName="orgH3Titles">Meetings</h3>

                  <div
                    className="org-meetings-display flex-column"
                    style={{
                      boxSizing: "borderBox",
                      width: "95%",
                      height: "250px",
                      borderTop: "1px solid black",
                      // borderBottom: "1px solid black",
                      alignItems:"center",
                      overflow: "scroll"
                    }}
                  >
                    {this.state.orgMeetings.map(meeting => (
                      <span>
                        {meeting.title}|{meeting.date}
                      </span>
                    ))}
                  </div>

                </div>

                <div
                  className="flex-column"
                  style={{ width: "100%", height: "auto" }}
                >
                  <h3 className="orgH3Titles">Members</h3>

                  <div
                    className="org-members-display flex-column"
                    style={{
                      boxSizing: "borderBox",
                      width: "95%",
                      height: "250px",
                      borderTop: "1px solid black",
                      // borderBottom: "1px solid black",
                      alignItems:"center",
                      overflow: "scroll"
                    }}
                  >

                    {this.state.orgMembers.map(member => (
                      <span >
                        {member.name}
                        <img
                          src={member.picture}
                          style={{ width: "30px", height: "30px" }}
                        />
                      </span>
                    ))}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Organization;
