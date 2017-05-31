import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';
import Task from './task';

export default class Inputs extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      tasks: []
    }
  }
  handleChange(event) {
    this.setState({title: event.target.value});
  }
  handleSubmit(event) {
   event.preventDefault();
   this.props.submitted(this.state.title, this.state.tasks);
 }
 renderTasks() {
   let r = (<div/>)
   if (this.state.tasks.length >= 1) {
     r = this.state.tasks.map(function(t) {
       return (
         <Task title={t['title']} date={t['date']}/>
       )
     })
   }
   return r;
 }
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <h2 class="m-v-md">Title:<input type="text" class="" value={this.state.title} onChange={this.handleChange}/></h2>
            {this.renderTasks()}
          </div>
        </div>
      </div>
    );
  }
}
