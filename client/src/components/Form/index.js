import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <div>
      <button
        {...props}
        style={{ align: "left", marginBottom: 10 }}
        className="btn btn-success"
      >
        {props.children}
      </button>
    </div>
  );
}
