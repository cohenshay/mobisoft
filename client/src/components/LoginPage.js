import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      phone: "",
      authError: ""
    }
  }
  checkResponse = (response) => {
    if (response.data.status == "success") {
      this.props.history.push("/verify");
    }
    else {
      this.setState({ authError: response.message })
    }
  }
  render() {
    return (
      <div className="login-main">
        <div className="row">
          <div className="col-sm-8">
            <div className="jumbotron">
              <form id="my_form">
                <div className="form-group">
                  <label >Email address</label>
                  <input type="email" className="form-control email-input" id="email" onChange={(e) => { this.setState({ email: e.target.value }) }} placeholder="cohenshay85@gmail.com" />
                </div>
                <div className="form-group">
                  <label >Password</label>
                  <input type="password" className="form-control password-input" id="password" onChange={(e) => { this.setState({ password: e.target.value }) }} placeholder="1234" />
                </div>
                <div className="form-group">
                  <label >Phone</label>
                  <input type="text" className="form-control phone-input" id="phone" onChange={(e) => { this.setState({ phone: e.target.value }) }} placeholder="972534296062" />
                </div>
                <button type="button" onClick={() => {
                  this.props.login({
                    email: this.state.email,
                    password: this.state.password,
                    phone: this.state.phone
                  }, this.checkResponse)
                }} className="btn btn-primary">Submit</button>
              </form>
              {this.state.authError && <div className="login-error">{`Login Error, status: ${this.state.authError.status}, message: ${this.state.authError.statusText}`}</div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}



const mapDispatchToProps = (dispatch) => ({
  login: (params, callback) => dispatch(login(params, callback))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
