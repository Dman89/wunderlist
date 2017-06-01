import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      date: props.date
    }
  }
  render() {
    return (
      <div className="m-b-lg" key={this.props.key}>

          <label className="m-b-xs" >Name: </label>
          <input className="m-b-md" type="text"  value={this.props.title} onChange={function(e) {this.props.handleChange2(e, this.props.key)}.bind(this)}/>

          <label className="m-b-xs" >Due Date: </label>
          <input className="m-b-md" type="date"  value={this.props.date} onChange={function(e) {this.props.handleChange3(e, this.props.key)}.bind(this)}/>

      </div>
    );
  }
}
