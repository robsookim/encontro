import React, { Component } from "react";
// import './meeting.css';

export default class Agenda extends Component {
  constructor(props) {
    super(props); 

    this.state = {
        userInput: '',
        user: '',
        list: []

    }
  }

  changeUserInput(input){
    this.setState({
        userInput: input.
    });
  }

  addToQueue(input){
    let listQueue= this.state.list; 
    listQueue.push(input); 
    this.setState({
      list: listQueue,
      userInput: ''
    })
  }

  render() {
    return (
      <div className="questionsWrapper">

        <h1 className="questionsTitle">question queue</h1>

        <ul className="questionList">
          {this.state.list.map( (val)=> <li key={val}>{val}</li>)}
        </ul>
        <input className="questionInput"
          onChange={ (e)=>this.changeUserInput(e.target.value) }
          value={this.state.userInput} 
          type="text"
        />
        <button onClick={ ()=> this.addToQueue(this.state.userInput)}>+</button>
        {/* <ul>
          {this.state.list.map( (val)=> <li key={val}>{val}</li>)}
        </ul> */}
      </div>
    )
  }
}