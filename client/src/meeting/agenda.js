import React, { Component } from "react";
import './meeting.css';

export default class Agenda extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      userInput: '',
      list: []
    }
  }

  changeUserInput(input){
    this.setState({
      userInput: input
    });
  }

  addToAgenda(input){
    let listAgenda= this.state.list; 
    listAgenda.push(input); 
    this.setState({
      list: listAgenda,
      userInput: ''
    })
  }

  render() {
    return (
      <div className="agendaWrapper">
        <h1 className="agendaTitle">agenda</h1>
        <ul className="agendaList">
          {this.state.list.map( (val)=> <li key={val}>{val}</li>)}
        </ul>
        <input 
          onChange={ (e)=>this.changeUserInput(e.target.value) }
          value={this.state.userInput} 
          type="text"
        />
        <button onClick={ ()=> this.addToAgenda(this.state.userInput)}>+</button>
        {/* <ul>
          {this.state.list.map( (val)=> <li key={val}>{val}</li>)}
        </ul> */}
      </div>
    )
  }
}