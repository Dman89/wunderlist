import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';
import Task from './task';

export default class Inputs extends Component {
  constructor() {
    super();
    this.state = {
      title: this.props.title,
      date: this.props.date
    }
  }
  handleChange(event) {
    this.setState({title: event.target.value});
  }
  handleChange2(event) {
    this.setState({date: event.target.value});
  }
  render() {
    return (
      <div className="row">
        <div class="col-xs-12 col-md-9 col-lg-9">
          <label>Name:</label>
          <input type="text"  value={this.state.title} onChange={this.handleChange}/>
        </div>
        <div class="col-xs-12 col-md-3 col-lg-3">
          <label>Due Date:</label>
          <input type="date"  value={this.state.date} onChange={this.handleChange2}/>
        </div>
      </div>
    );
  }
}
