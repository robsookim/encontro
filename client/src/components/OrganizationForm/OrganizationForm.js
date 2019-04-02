import React, { Component } from "react";
import "./OrganizationForm.css";
class OrganizationForm extends Component {
  render() {
    return (
      <div className="organization-form-wrapper" style={{width:this.props.width||"70%", height:this.props.height||"80%"}}>
        <form className="org-create-form">
          <h2 className = "org-form-header">Create Organization</h2>
          <label className="org-form-input-wrapper">
            Organization Name
            <input
              className="org-form-input text-input"
              type="text"
              name="orgName"
              onChange={this.props.changeOrgFormValue}
              value={this.props.formState.orgName}
            />
          </label>
          <label className="org-form-input-wrapper">
            Organization Secret
            <input
              className="org-form-input text-input"
              type="password"
              name="orgSecret"
              onChange={this.props.changeOrgFormValue}
              value={this.props.formState.orgSecret}
            />
          </label>

          <span style={{
            fontSize:"20px"
          }}>Approval Required</span>

          <div className="org-form-input-wrapper">
            <input
              type="radio"
              name="orgApproval"
              id="Yes"
              value={1}
              onChange={this.props.changeOrgFormValue}
              className="org-form-input"
            />
            <label htmlFor="Yes">Yes</label>
            <input
              type="radio"
              name="orgApproval"
              id="No"
              value={0}
              onChange={this.props.changeOrgFormValue}
              className="org-form-input"
            />
            <label htmlFor="No">No</label>
          </div>

          <button 
          onClick = {this.props.handleFormSubmit} 
          className="org-form-submit" 
          type="submit">
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default OrganizationForm;
