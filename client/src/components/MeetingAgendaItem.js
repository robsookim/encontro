import React, { Component } from "react";
class MeetingAgendaItem extends Component {

  render() {
    return (
      <div className="meeting-agenda-item-wrapper" value = {this.props.level}>
        <div className = "item-header" style={{display:"flex", marginLeft:`${this.props.level*10}px`}}>
            <span className = "item-header" >
                {this.props.value}
            </span>
        </div>
      </div>
    );
  }
}

export default MeetingAgendaItem;
