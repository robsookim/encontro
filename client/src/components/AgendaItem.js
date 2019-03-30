import React, { Component } from "react";
import "./AgendaItem.css"
class AgendaItem extends Component {

  render() {
    return (
      <div className="agenda-item-wrapper" value = {this.props.level}>
        <label className = "item-header" style={{display:"flex", marginLeft:`${this.props.level*10}px`}}>
            <input value = {this.props.inputValue}className = "item-header" placeholder="Item #_" onChange={this.props.onItemChange.bind(this,this.props.me, this.props.parent)}>
            </input>
            <button /*onClick={this.props.addItem}*/ className="add-item" onClick={this.props.onAddItem.bind(this, this.props.me,this.props.parent)}>
                Add item {this.props.parent.join("/") + "|" + this.props.me}
            </button>
        </label>
      </div>
    );
  }
}

export default AgendaItem;
