import React, { Component } from "react";
import "./meeting.css";
import MeetingAgendaItem from "../../components/MeetingAgendaItem";

export default class Agenda extends Component {
  render() {
    function displayItems(arr, level, parent, crossOutItem){
      return arr.map((item, i) => {
        if ("header" in item) {
          return (
            <div>
              <MeetingAgendaItem
                me={i}
                parent={parent}
                level={level}
                value={item.header}
                completed={item.completed}
                crossOutItem={crossOutItem}
              />
              {displayItems(
                item.items,
                level + 1,
                parent.concat([i]),
                crossOutItem
              )}
            </div>
          );
        }
        return (
          <MeetingAgendaItem
            me={i}
            parent={parent}
            level={level}
            value={item.text}
            completed={item.completed}
            crossOutItem={crossOutItem}
            />
        );
      });
    };
    return (
      <div className="agendaWrapper">
        <h1 className="agendaTitle">agenda</h1>
        <div className="agendaList">
          {displayItems(this.props.agenda, 0, [], this.props.crossOutItem)}
        </div>
      </div>
    );
  }
}
