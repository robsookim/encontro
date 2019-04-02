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
        chat: this.props.currentChat
      }
    }
  
    changeUserInput(input){
      this.setState({
        userInput: input
      });
    }
  
    addToChat(input){
        let currentChat= this.state.chat; 

        API.saveChat(this.props.meetingID, input)
            .then(res => {
                console.log(res);
                currentChat.push(res.data);
                // console.log(this.props.match.params.id);
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
  
          <div className="chatList">
            {this.state.chat.map((val, index)=> <p key={index}>{val}</p>)}
          </div>
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