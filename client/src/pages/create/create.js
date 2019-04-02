import React, { Component } from "react";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API.js";
import "./create.css";
import AgendaItem from "../../components/AgendaItem";
import axios from "axios";
import NavBar from "../../components/NavBar";
class Create extends Component {
  state = {
    title: "",
    date: "",
    time: "",
    agenda: [{ header: "", items: [""] }],
    attendees: [],
    attendeeSearch: "",
    userName: "",
    picture: ""
  };
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSearchAttendee = this.handleSearchAttendee.bind(this);
  }
  componentDidMount(){
    axios.get("/api/userinfo").then(res=>{
      this.setState({
        userName:res.data.name,
        picture:res.data.picture
      })
    })
  }
  getMeetings = () => {
    API.getMeetings()
      .then(res => console.log("got some meetings"))
      .catch(err => console.log(err));
  };

  handleInputChange(event) {
    let { name: fieldName, value } = event.target;

    this.setState({
      [fieldName]: value
    });
  }
  handleSearchAttendee(event) {
    let { name: fieldName, value } = event.target;

    this.setState({
      [fieldName]: value
    });
    axios.post("/api/users").then(res => {
      console.log(res);
    });
  }
  displayItems = (arr, level, parent) => {
    return arr.map((item, i) => {
      if (typeof item === "object") {
        return (
          <div>
            <AgendaItem
              me={i}
              parent={parent}
              level={level}
              onAddItem={this.handleAgendaItemAdd}
              onItemChange={this.handleAgendaItemChange}
              inputValue={item.header}
            />
            {this.displayItems(item.items, level + 1, parent.concat([i]))}
          </div>
        );
      }
      return (
        <AgendaItem
          me={i}
          parent={parent}
          level={level}
          onAddItem={this.handleAgendaItemAdd}
          onItemChange={this.handleAgendaItemChange}
          inputValue={item}
        />
      );
    });
  };
  handleFormSubmit(event) {
    event.preventDefault();
    console.log(this.state.agenda);
    console.log("form has been submitted");
    const meeting = {
      title: this.state.title,
      date: this.state.date,
      time: this.state.time,
      agenda: this.state.agenda
    };

    this.setState({
      title: "",
      date: "",
      time: "",
      agenda: [{ header: "", items: [] }]
    });

    API.saveMeeting(meeting)
      .then(res => {
        console.log("REACT saved the meeting");
        // this.getMeetings()
        this.props.history.push("/join");
      })
      .catch(err => console.log(err));
  }

  handleAgendaItemAdd = (me, parent, event) => {
    event.preventDefault();

    function stepThrough(arr, parent) {
      if (parent.length < 1) {
        if (typeof arr[me] === "object") {
          arr[me].items.push("");
          return arr;
        } else {
          arr[me] = { header: arr[me], items: [""] };
          return arr;
        }
      } else {
        arr[parent[0]].items = stepThrough(
          arr[parent[0]].items,
          parent.slice(1)
        );
        return arr;
      }
    }
    let agendaCopy = stepThrough(this.state.agenda.slice(0), parent);

    this.setState({
      agenda: agendaCopy
    });
  };
  handleAgendaItemChange = (me, parent, event) => {
    console.log("ITEMCHANGE");
    event.preventDefault();
    function stepThrough(arr, parent) {
      if (parent.length < 1) {
        if (typeof arr[me] === "object") {
          arr[me].header = event.target.value;
          return arr;
        } else {
          arr[me] = event.target.value;
          return arr;
        }
      } else {
        // console.log("Parent: "+parent);
        // console.log(arr);
        arr[parent[0]].items = stepThrough(
          arr[parent[0]].items,
          parent.slice(1)
        );
        return arr;
      }
    }
    let agendaCopy = stepThrough(this.state.agenda.slice(0), parent);

    this.setState({
      agenda: agendaCopy
    });
  };
  render() {
    return (
      <div>
        <NavBar proPic={this.state.picture} userName={this.state.userName} />

        <div className="create-wrapper">
          <div className="create-form-wrapper">
            <h1 className="meetingTitle">Create a Meeting</h1>
            <form className="create-form">
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Meeting Title"
              />
              {/* should change this to a "select a date" format? */}
              <Input
                value={this.state.date}
                onChange={this.handleInputChange}
                name="date"
                placeholder="Meeting Date"
                type="date"
              />
              {/* change this to "select a time" format? */}
              <Input
                value={this.state.time}
                onChange={this.handleInputChange}
                name="time"
                placeholder="Meeting Time"
                type="time"

              />
              <Input
                value={this.state.attendeeSearch}
                onChange={this.handleSearchAttendee}
                name="attendeeSearch"
                placeholder="Add attendees"
              />
              {/* <TextArea
                value={this.state.agenda}
                onChange={this.handleInputChange}
                name="agenda"
                placeholder="Agenda"
              /> */}
              {this.displayItems(this.state.agenda.slice(0), 0, [])}
              <FormBtn
                disabled={!this.state.title}
                onClick={this.handleFormSubmit}
              >
                Schedule Meeting
              </FormBtn>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
