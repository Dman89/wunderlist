import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';
class Auth extends Component {
  componentWillMount() {
    this.props.getQuery(this.props.location.query);
  }
  render() {
    return (
      <div className="Welcome">
        <h1>Welcome</h1>
      </div>
    );
  }
}
export default connect(null, actions)(Auth);
