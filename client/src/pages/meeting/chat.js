import React, { Component } from 'react';
import API from '../../utils/API';
// import './meeting.css';

export default class Chat extends Component {
    constructor(props) {
      super(props); 

      this.changeUserInput = this.changeUserInput.bind(this);
      this.addToChat = this.addToChat.bind(this);
  
      this.state = {
        userInput: '',
        chat: []
      }
    }
  
    changeUserInput(input){
      this.setState({
        userInput: input
      });
    }
  
    addToChat(input){
        let currentChat= this.state.chat; 

        API.saveChat(input)
            .then(res => {
                console.log(res);
                currentChat.push(res.data);
                this.setState({
                    chat: currentChat,
                    userInput: ''
                })
            })
            .catch(err => console.log(err));
    }
  
    render() {
      return (
        <div className="chatWrapper">
  
          <h1 className="chatTitle">chat</h1>
  
          <ul className="chatList">
            {this.state.chat.map((val, index)=> <li key={index}>{val}</li>)}
          </ul>
          <input className="chatInput"
            onChange={ (e)=>this.changeUserInput(e.target.value) }
            value={this.state.userInput} 
            type="text"
          />
          <button onClick={ ()=> this.addToChat(this.state.userInput)}>send</button>
        </div>
      )
    }
  }