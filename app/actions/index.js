import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_USER_DATA, GOT_QUERY, ACCESS_TOKEN, ACCESS_TOKEN_ERROR,
LISTSET_SET, FAILURE, SUCCESS
} from './types';
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

export function getToken(config) {
  return function(dispatch) {
    let code = config.headers["X-Access-Token"];
    let client_id = config.headers["X-Client-ID"];
    axios.post('/api/post', config)
    .then(function(res) {
      localStorage.setItem('ACCESS_TOKEN', res.data.data);
      localStorage.setItem('CODE', code);
      localStorage.setItem('CLIENT_ID', client_id);
      let headers = {"X-Client-ID": client_id, "X-Access-Token": res.data.data}
      localStorage.setItem('headers', JSON.stringify(headers));
      const payload = localStorage.getItem("ACCESS_TOKEN");
      dispatch({type: ACCESS_TOKEN, payload: res.data.data})
    })
    .catch(function(res) {
      dispatch({type: ACCESS_TOKEN_ERROR})
    })
  }
}
export function fetchToken() {
  return function(dispatch) {
    const payload = localStorage.getItem("ACCESS_TOKEN");
    if (payload) {
      dispatch({type: ACCESS_TOKEN, payload})
    }
    else {
      dispatch({type: ACCESS_TOKEN_ERROR})
    }
  }
}
export function setListSet(payload) {
  return function(dispatch) {
    localStorage.setItem('listSet', payload)
    dispatch({type: LISTSET_SET, payload})
  }
}
export function loadListSet() {
  return function(dispatch) {
    let payload = localStorage.getItem('listSet', payload)
    dispatch({type: LISTSET_SET, payload})
  }
}
export function submitted({title, tasks, id}) {
  const configi = {headers: JSON.parse(localStorage.getItem("headers"))};
  let payload = {title: title};
  return function(dispatch) {
    axios.post('https://a.wunderlist.com/api/v1/lists', payload, configi)
    .then(function(res) {
      const listId = res.data.id;
      let results = [];
      tasks.map(function(t) {
        let result = {};
        result.list_id = listId;
        result.title = t.title;
        result.due_date = t.date;
        axios.post('https://a.wunderlist.com/api/v1/tasks', result, configi)
        .then(function(r) {
          results.push(r.data)
        })
        .catch(function(r) {
          results.push(r.response)
        })
      })
      dispatch({type: SUCCESS, payload: listId})
    })
    .catch(function(res) {
      for (var x in res) {
        console.log(res[x]);
      }
      dispatch({type: FAILURE})

    })
  }
}
