import React, { Component } from "react";
import "./AgendaItem.css"
class AgendaItem extends Component {

  render() {
    return (
      <div className="agenda-item-wrapper" value = {this.props.level}>
        <label className = "item-header" style={{display:"flex", marginLeft:`${this.props.level*10}px`}}>
            <input value = {this.props.inputValue}className = "item-header" placeholder="Agenda Item" onChange={this.props.onItemChange.bind(this,this.props.me, this.props.parent)}>
            </input>
            <button className="add-item" onClick={this.props.onAddItem.bind(this, this.props.me,this.props.parent)}>
                Add
            </button>
        </label>
      </div>
    );
  }
}

export default AgendaItem;
