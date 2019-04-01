import React, { Component } from "react";
import API from "../../utils/API.js";
import OrganizationForm from "../../components/OrganizationForm/OrganizationForm.js";
import OrganizationJoin from "../../components/OrganizationForm/OrganizationJoin.js";
import axios from "axios";

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
    }
  };
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
    axios
      .post("/api/organization", this.state.newOrganization)
      .then(res => {
        this.setState({
          newOrganization: {
            orgName: "",
            orgSecret: "",
            orgApproval: 0
          }
        });
      });
  };
  handleFormSubmitJoinOrg = e => {
    e.preventDefault();
    console.log(this.state.joinOrganization);
    axios
      .put("/api/organization", this.state.newOrganization)
      .then(res => {
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
        <OrganizationForm
          handleFormSubmit={this.handleFormSubmitNewOrg}
          formState={this.state.newOrganization}
          changeOrgFormValue={this.handleChangeNewOrg}
        />
        <OrganizationJoin
          handleFormSubmit={this.handleFormSubmitJoinOrg}
          formState={this.state.joinOrganization}
          changeOrgFormValue={this.handleChangeJoinOrg}
        />
      </div>
    );
  }
}

export default Organization;
