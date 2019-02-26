// import { firebase, googleAuthProvider } from '../firebase/firebase';

import axios from 'axios';
export const login = (params, callback) => {
  let data = {
    email: params.email,
    password: params.password,
    phone:params.phone
  };

  return function (dispatch) {
    axios.post(`http://localhost:8080/auth/login`, data)
      .then((response) => {

        //set token to local storage so when refreshing the app won't need to login again
        localStorage.setItem('clientToken', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        callback(response);
        return dispatch({
          type: 'LOGIN',
          uid: response.data.token,
          currentUser: response.data.user,
          requestId:response.data.requestId
        })
      }).catch((err) => callback(err.response))
  }
}

export const signIn = (params, callback) => {
  let data = {
    email: params.email,
    password: params.password,
    fname: params.fname,
    lname: params.lname,
    address: params.address,
    username: params.username,
    phone: params.phone,
  };

  return function (dispatch) {
    axios.post(`http://localhost:8080/auth/signIn`, data)
      .then((response) => {
       
        callback(response);
        return dispatch({
          type: 'LOGIN',
          currentUser: response.data.user
        })
      }).catch((err) => callback(err.response))
  }
}
export const verify = (params, callback) => {
  let data = {
    pin: params.pin,
    requestId: params.requestId,
    user: params.user
  };

  return function (dispatch) {
    axios.post(`http://localhost:8080/auth/verify`, data)
      .then((response) => {

        //set token to local storage so when refreshing the app won't need to login again
        localStorage.setItem('clientToken', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        callback(response);
        return dispatch({
          type: 'VERIFY',
          uid: response.data.token,
          currentUser: response.data.user
        })
      }).catch((err) => callback(err.response))
  }
}

export const logout = () => {

  localStorage.removeItem('clientToken');
  localStorage.removeItem('currentUser');
  window.location.href = "/";
  return function (dispatch) {
    return dispatch({
      type: 'LOGOUT'
    })
  }
}

export const refreshToken = () => {
  const clientToken = localStorage.getItem("clientToken");
  return function (dispatch) {
    return dispatch({
      type: 'REFRESH_TOKEN',
      uid: clientToken,
    })
  }
}

