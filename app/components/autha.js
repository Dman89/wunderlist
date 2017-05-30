import React, { Component } from 'react';
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
