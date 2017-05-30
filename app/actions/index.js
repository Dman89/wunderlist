import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_USER_DATA, GOT_QUERY} from './types';
const port = process.env.PORT || 3000;
const ROOT_URL = process.env.ROOT_URL || "http://localhost:"+port;
export function signinUser({email, password}) {
  return function(dispatch) {
    //Submit email/pw to server
    axios.post(`${ROOT_URL}/api/signin`, {email, password})
    .then(function(response) {
    //Request: Good
      if (response.status == 200) {
        // - Update State to indicate user is authenticated
        dispatch({type: AUTH_USER})
        // - Save JWT Token
        const {token} = response.data;
        localStorage.setItem('token', token)
        // - Redirect to the route '/profile'
        browserHistory.push('/profile');
      }
    })
    .catch((res) => {
    //Request: Bad
      // - Show an error to the user
      dispatch(authError("Bad Login Info"))
    })

  }
}
export function signupUser({email, password}) {
  return function(dispatch) {
    //Submit email/pw to server
    axios.post(`${ROOT_URL}/api/signup`, {email, password})
    .then(function(response) {
    //Request: Good
      if (response.status == 200) {
        // - Update State to indicate user is authenticated
        dispatch({type: AUTH_USER})
        // - Save JWT Token
        const {token} = response.data;
        localStorage.setItem('token', token)
        // - Redirect to the route '/profile'
        browserHistory.push('/profile');
      }
    })
    .catch((res) => {
    //Request: Bad
      // - Show an error to the user
      dispatch(authError("Email in Use"))
    })

  }
}

export function signoutUser() {
  if (localStorage.length !== 0) {
    localStorage.removeItem('token');
  }
  browserHistory.push('/');
  return {
    type: UNAUTH_USER
  }
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchMessage() {
  return function(dispatch) {
    const config = {headers: {
      authorization: localStorage.getItem('token')
    }}
    axios(ROOT_URL+"/api/profile/", config)
    .then((res)=> {
      dispatch({type: AUTH_USER_DATA, payload: res.data.user})
    })
    .catch((res) => {
      var unauth = signoutUser();
      dispatch(unauth);
    })
  }
}

export function getQuery(q) {
  return function(dispatch) {
    dispatch({type: GOT_QUERY, payload: q})
  }
}
