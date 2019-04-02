import React, { Component } from "react";
class MeetingAgendaItem extends Component {
  render() {
    return (
      <div
        onClick={this.props.crossOutItem.bind(this, this.props.parent,this.props.me)}
        className="meeting-agenda-item-wrapper"
        value={this.props.level}
      >
        <div
          className="item-header"
          style={{ display: "flex", marginLeft: `${this.props.level * 10}px` }}
        >
          <span
            className="item-header"
            style={{
              textDecoration: this.props.completed ? "line-through" : "none"
            }}
          >
            {this.props.value}
          </span>
        </div>
      </div>
    );
  }
}

export default MeetingAgendaItem;
