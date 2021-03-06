import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Welcome from './components/welcome';
import Auth from './components/autha';
import Signin from './components/auth/signin';
import Profile from './components/user/profile';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import reducers from './reducers';
import RequireAuth from './components/auth/req_auth';
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
if(token) {
  store.dispatch({type: AUTH_USER})
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin}/>
        <Route path="signout" component={Signout}/>
        <Route path="signup" component={Signup}/>
        <Route path="profile" component={RequireAuth(Profile)}/>
        <Route path="auth" component={RequireAuth(Auth)}/>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('#Run'));
