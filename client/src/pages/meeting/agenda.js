import React, { Component } from "react";
import './meeting.css';
import MeetingAgendaItem from "../../components/MeetingAgendaItem";

export default class Agenda extends Component {

  displayItems = (arr, level, parent) => {
    return arr.map((item, i) => {
      if (typeof item === "object") {
        return (
          <div>
            <MeetingAgendaItem
              me={i}
              parent={parent}
              level={level}
              value={item.header}
            />
            {this.displayItems(item.items, level + 1, parent.concat([i]))}
          </div>
        );
      }
      return (
        <MeetingAgendaItem
          me={i}
          parent={parent}
          level={level}
          value={item}
        />
      );
    });
  };

  render() {
    return (
      <div className="agendaWrapper">

        <h1 className="agendaTitle">agenda</h1>

        {/* <ul className="agendaList">
          {this.state.list.map( (val)=> <li key={val}>{val}</li>)}
        </ul> */}
        <div className="agendaList">
          {this.displayItems(this.props.agenda, 0, [])}
        </div>
        {/* <input className="agendaInput"
          onChange={ (e)=>this.changeUserInput(e.target.value) }
          value={this.state.userInput} 
          type="text"
        /> */}
        {/* <button onClick={ ()=> this.addToAgenda(this.state.userInput)}>+</button> */}
        {/* <ul>
          {this.state.list.map( (val)=> <li key={val}>{val}</li>)}
        </ul> */}
      </div>
    )
  }
}