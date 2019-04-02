import React, { Component } from "react";
import "./OrganizationForm.css";
class OrganizationJoin extends Component {
  render() {
    return (
      <div className="organization-form-wrapper" style={{width:this.props.width||"70%", height:this.props.height||"80%"}}>
        <form className="org-join-form">
          <h2 className = "org-form-header">Join Organization</h2>
          <label className="org-form-input-wrapper">
            Organization ID
            <input
              className="org-form-input text-input"
              type="text"
              name="orgId"
              onChange={this.props.changeOrgFormValue}
              value={this.props.formState.orgId}
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
          <button 
          onClick = {this.props.handleFormSubmit} 
          className="org-form-submit" 
          type="submit">
            Join
          </button>
        </form>
      </div>
    );
  }
}

export default OrganizationJoin;