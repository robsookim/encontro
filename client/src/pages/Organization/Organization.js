import React, { Component } from "react";
import API from "../../utils/API.js";
import OrganizationForm from "../../components/OrganizationForm/OrganizationForm.js";

class Organization extends Component {
  state = {
    newOrganization: {
      orgName: "",
      orgSecret: "",
      orgApproval: 0
    }
  };
  handleChange =e =>{
    const newOrg = this.state.newOrganization;
    newOrg[e.target.name] = e.target.value
    this.setState({newOrganization:newOrg});
  }
  handleFormSubmit = e=>{
    e.preventDefault();
    console.log(this.state.newOrganization);
  }

  render() {
    return (
      <div className="org-page">
        <OrganizationForm handleFormSubmit ={this.handleFormSubmit} formState = {this.state.newOrganization}changeOrgFormValue={this.handleChange} />
      </div>
    );
  }
}

export default Organization;
