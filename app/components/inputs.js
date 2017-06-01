import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';
import Task from './task';
let num = 1;
function newDate() {
  let d = new Date();
  return d.toISOString().split('T')[0];
}
class Inputs extends Component {
  constructor() {
    super();
    let dflt = localStorage.getItem("default_listset");
    if (dflt) {
      this.state = JSON.parse(dflt);
    }
    else {
      let initalState = {
        title: "Project Title",
        tasks: [{title: "First Task", date: newDate(), key: (new Date() + num)}]
      }
      num += 1;
      localStorage.setItem("default_listset", JSON.stringify(initalState));
      this.state = initalState;
    }
  }
  handleChange(event) {
    this.setState({title: event.target.value});
    this.props.setListSet({title: this.state.title, tasks: this.state.tasks, id: this.props.id})
    let { title, tasks } = this.state;
    let newState = { title: event.target.value, tasks };
    localStorage.setItem("default_listset", JSON.stringify(newState))
  }
  handleChange2(event, k) {
    let { tasks, title } = this.state;
    let newArr = [].concat(tasks)
    newArr.map(function(t, i) {
      if (t.key == k) {
        newArr[i].title = event.target.value;
      }
    })
    this.setState({tasks: newArr});
    let newState = { title, tasks: newArr };
    localStorage.setItem("default_listset", JSON.stringify(newState))
  }
  handleChange3(event, k) {
    let { tasks, title } = this.state;
    let newArr = [].concat(tasks)
    newArr.map(function(t, i) {
      if (t.key == k) {
        newArr[i].date = event.target.value;
      }
    })
    this.setState({tasks: newArr});
    let newState = { title, tasks: newArr };
    localStorage.setItem("default_listset", JSON.stringify(newState))
  }
  handleSubmit(event) {
   event.preventDefault();
   let { title, tasks } = this.state;
   let newState = { title, tasks };
   localStorage.setItem("default_listset", JSON.stringify(newState))
   this.props.submitted({...newState, id: this.props.id});
 }
 addTask() {
   let newArr = [].concat(this.state.tasks, {title: "", date: newDate(), key: (new Date() + num)});
   num += 1;
   this.setState({tasks: newArr});
   let { title, tasks } = this.state;
   let newState = { title, tasks: newArr };
   localStorage.setItem("default_listset", JSON.stringify(newState));
 }
 removeTask(k) {
   let {tasks} = this.state;
   let newArr = [].concat(tasks);
   let results;
   newArr.map(function(t, i) {
     if (t.key == k) {
       results = newArr.slice(0,i).concat(newArr.slice(i+1));
     }
   })
   this.setState({tasks: results});
   let { title } = this.state;
   let newState = { title, tasks: results };
   localStorage.setItem("default_listset", JSON.stringify(newState));
 }
 renderTasks() {
   let r = (<div/>)
   if (this.state.tasks.length >= 1) {
     r = this.state.tasks.map(function(t,i) {
       return (
         <ul className="list-group" key={t.key+i}>
           <li className="list-group-item">
            <div className="centerContainer">
              <Task title={t['title']} date={t['date']} key={t.key} handleChange2={function(e) {this.handleChange2(e, t.key)}.bind(this)} handleChange3={function(e) {this.handleChange3(e, t.key)}.bind(this)}/>
              <button className="btn btn-block btn-danger max-w-300" onClick={function() {this.removeTask(t.key)}.bind(this)}>Remove</button>
            </div>
           </li>
         </ul>
       )
     }.bind(this))
   }
   return r;
 }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 padder-xl">
            <div className="panel">
              <div className="panel-header padder-md">
               <div className="centerContainer">
                  <h2 className="panel-title">Title:</h2>
                  <input type="text" className="panel-title-input" value={this.state.title} onChange={function(e) {this.handleChange(e)}.bind(this)}/>
                </div>
              </div>
              {this.renderTasks()}
              <div className="panel-footer padder-md">
                <div className="row">
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center p-b-sm">
                    <button className="btn btn-success btn-block max-w-300" onClick={function() {this.addTask()}.bind(this)}>Add</button>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center">
                    <button className="btn btn-primary btn-block max-w-300" onClick={function(e) {this.handleSubmit(e)}.bind(this)}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({listSet}){
  return {
    listSet
  }
}
export default connect(mapStateToProps, actions)(Inputs);
