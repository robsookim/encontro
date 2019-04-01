import React, { Component } from "react";
import API from "./../utils/API.js";
import OrganizationForm from "../../components/OrganizationForm/OrganizationForm.js";

class Organization extends Component {
  state = {
    newOrganization: {
      orgName: "",
      orgSecret: "",
      orgApproval: ""
    }
  };
  handleChange(e) {
    const newOrg = this.state.newOrganization;
    newOrg[e.target.name] = e.target.value
    this.setState({newOrganization:newOrg});
  }

  render() {
    return (
      <div className="org-page">
        <OrganizationForm changeOrgFormValue={this.handleChange} />
      </div>
    );
  }
}

export default Organization;
