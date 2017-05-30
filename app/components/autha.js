import React, { Component } from 'react';
export default class Auth extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="Welcome">
        <h1>Welcome</h1>
      </div>
    );
  }
}
