import React, { Component } from 'react';
export default class Welcome extends Component {
  renderAuthLink() {
    const client_id = "8d2629ece2e67e8783b2";
    const uri = "http://www.danielcudney.com/wunderlist/auth";
    const s = "asdfASdfaDSFaw2#$@!#ADF";
    const url = `https://www.wunderlist.com/oauth/authorize?client_id=${client_id}&redirect_uri=${uri}&state=${s}`;
    return (
      <a href={url}>Authorize</a>
    )
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
