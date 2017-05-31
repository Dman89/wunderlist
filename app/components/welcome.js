import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';
import Axios from 'axios';
import Inputs from './inputs';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {'run': 0, id: ""}
  }
  runState() {
    this.setState({run: 1})
  }
  loaduser() {
    if (this.props.query.access_token) {
      const client_id = "0af52551e0973c7faa55";
      const {access_token} = this.props.query;
      const config = {"headers": {"X-Access-Token": access_token, "X-Client-ID": client_id, 'Content-Type': 'application/json'}};
      Axios.get('https://a.wunderlist.com/api/v1/user', config)
      .then(function(res) {
        this.setState({id: res.data.id});
      })
      .catch(function(res) {
        console.log(res[response]);
      })
    }
  }
  renderAuthLink() {
    const client_id = "0af52551e0973c7faa55";
    const s = "asdfASdfaDSFaw2";
    if (!this.props.query.code) {
      const uri = "https://mysterious-beyond-20280.herokuapp.com/auth";
      const url = `https://www.wunderlist.com/oauth/authorize?client_id=${client_id}&redirect_uri=${uri}&state=${s}`;
      return (
        <a href={url}>Authorize</a>
      )
    }
    else if (this.props.query.code && this.props.query.state == s && this.state.run == 0 && !this.props.query.access_token) {
      const {code} = this.props.query;
      const config = {"headers": {"X-Access-Token": code, "X-Client-ID": client_id}, code};
      this.runState()
      this.props.getToken(config)
      return (<span>Loading Lists</span>)
    }
    else {
      if (this.state.id.length > 5) {
        this.loaduser();
        this.props.loadListSet();
      }
      return (
        <Inputs/>
      )
    }
  }
  render() {
    console.log(this.state.id);
    return (
      <div className="Welcome">
        <h1>Welcome</h1>
        {this.renderAuthLink()}
        {this.loaduser()}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {query: state.query};
}

export default connect(mapStateToProps, actions)(Welcome);
