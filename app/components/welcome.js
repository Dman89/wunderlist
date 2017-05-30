import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';
import Axios from 'axios';
class Welcome extends Component {
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
    else if (this.props.query.code && this.props.query.state == s) {
      const {code} = this.props.query;
      const config = {"headers": {"X-Access-Token": code, "X-Client-ID": client_id}, code};
      Axios.post('/api/post', config)
      .then(function(res) {
        console.log(res);
      })
    }
  }
  render() {
    return (
      <div className="Welcome">
        <h1>Welcome</h1>
        {this.renderAuthLink()}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {query: state.query};
}

export default connect(mapStateToProps, actions)(Welcome);
