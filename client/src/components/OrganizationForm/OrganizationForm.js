import React, { Component } from "react";
import "./OrganizationForm.css";
class OrganizationForm extends Component {
  render() {
    return (
      <div className="organization-form-wrapper">
        <form>
          <h2>Create Organization</h2>
          <label>
            Organization Name
            <input type="text" name="org-name" onChange={this.props.changeOrgFormValue}/>
          </label>
          <label>
            Organization Secret
            <input type="password" name="org-secret" onChange={this.props.changeOrgFormValue}/>
          </label>
          <span>Approval Required</span>
          <input type="radio" name="org-approval" id="Yes" value={true} onChange={this.props.changeOrgFormValue}/>
          <label for="Yes">Yes</label>
          <input type="radio" name="org-approval" id="No" value={false} onChange={this.props.changeOrgFormValue}/>
          <label for="No">No</label>
          <button type="submit">
              Create
          </button>
        </form>
      </div>
    );
  }
}

export default OrganizationForm;
