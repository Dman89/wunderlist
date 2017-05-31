import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';
import Task from './task';

class Inputs extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      tasks: []
    }
  }
  handleChange(event) {
    this.setState({title: event.target.value});
    this.props.setListSet({title: this.state.title, tasks: this.state.tasks, id: this.props.id})
  }
  handleSubmit(event) {
   event.preventDefault();
   this.props.submitted({title: this.state.title, tasks: this.state.tasks, id: this.props.id});
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
    console.log(this.props.listSet);
    return (
      <form onSubmit={this.handleSubmit} className="container" onChange={function(){console.log("hey")}}>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <h2 className="m-v-md">Title:<input type="text" className="" value={this.state.title} onChange={this.handleChange}/></h2>
            {this.renderTasks()}
          </div>
        </div>
      </form>
    );
  }
}
function mapStateToProps({listSet}){
  return {
    listSet
  }
}
export default connect(mapStateToProps, actions)(Inputs);
