import React, { Component } from "react";
import API from "../../utils/API";
import "./meeting.css";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.changeUserInput = this.changeUserInput.bind(this);
    this.addToChat = this.addToChat.bind(this);
    this.getChat = this.getChat.bind(this);

    this.state = {
      userInput: "",
      chat: this.props.currentChat
    };
  }

  componentDidMount() {
    this.setState({
      chat: this.props.currentChat
    });
    const chatTimer = setInterval(this.getChat, 1000);
    // this.getChat();
  }

  changeUserInput(input) {
    this.setState({
      userInput: input
    });
  }

  getChat() {
    API.getChat(this.props.meetingID)
      .then(res => {
        console.log(res);
        this.setState({
          chat: res.data
        });
      })
      .catch(err => console.log(err));
  }

  addToChat() {
    // let currentChat= this.state.chat;

    API.saveChat(this.props.meetingID, this.state.userInput)
      .then(res => {
        console.log(res.data);
        // console.log(this.props.match.params.id);
        this.setState({
          chat: res.data,
          userInput: ""
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="chatWrapper">
        <h1 className="chatTitle">chat</h1>

        <div className="chatList">
          {this.state.chat.map((val, index) => (
            <p className="chatEntry" key={index}>
              {val}
            </p>
          ))}
        </div>
        <input
          className="chatInput"
          onChange={e => this.changeUserInput(e.target.value)}
          value={this.state.userInput}
          type="text"
        />
        <button className="chatBtn" onClick={this.addToChat}>
          send
        </button>
      </div>
    );
  }
}
