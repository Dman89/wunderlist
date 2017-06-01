import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';
import Axios from 'axios';
import Inputs from './inputs';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {'run': 0, id: "", getToken: 0};
  }
  componentWillMount() {
    if (this.state.getToken === 0 && !this.props.query.code) {
      this.setState({getToken: 1})
      this.props.fetchToken();
    }
  }
  runState(that) {
    that.setState({run: 1})
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
        for (var x in res) {
          console.log(res[x]);
        }
      })
    }
  }
  renderStatus() {
    const status = this.props.status;
    console.log(status);
    if (status) {
      return status.map(function(s, i) {
        if (s.indexOf("https")>=0) {
          return (
            <a key={i} href={s} target="_blank" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {s}
            </a>
          )
        }
        else {
          return (
            <div key={i} className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {s}
            </div>
          )
        }
      })
    }
  }
  renderAuthLink() {
    const client_id = "0af52551e0973c7faa55";
    const s = "asdfASdfaDSFaw2";
    if (this.props.query.access_token) {
      if (this.state.id.length > 5) {
        this.props.loadListSet();
      }
      return <Inputs id={this.state.id}/>;
    }
    else if (!this.props.query.code) {
      // const uri = "https://db654d62.ngrok.io/auth";
      const uri = "https://mysterious-beyond-20280.herokuapp.com/auth";
      const url = `https://www.wunderlist.com/oauth/authorize?client_id=${client_id}&redirect_uri=${uri}&state=${s}`;
      return (
        <a href={url}>Authorize</a>
      )
    }
    else if (this.props.query.code && this.props.query.state == s && this.state.run == 0 && !this.props.query.access_token) {
      const {code} = this.props.query;
      const config = {"headers": {"X-Access-Token": code, "X-Client-ID": client_id}, code};
      this.runState(this)
      this.props.getToken(config)
      return (<span>Loading Lists</span>)
    }
    else {
      if (this.state.id.length > 5) {
        this.props.loadListSet();
      }
      return (
        <Inputs id={this.state.id}/>
      )
    }
  }
  render() {
    return (
      <div className="Welcome">
        <div className="row">
          {this.renderStatus()}
        </div>
        {this.renderAuthLink()}
        {this.loaduser()}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {query: state.query, status: state.status};
}

export default connect(mapStateToProps, actions)(Welcome);
