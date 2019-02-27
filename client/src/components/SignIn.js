import React from 'react';
import { connect } from 'react-redux';
import { signIn} from '../actions/auth';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      fname: "",
      lname: "",
      phone: "",
      address: "",
      username: "",
      authError: ""
    }
  }
  checkResponse = (response) => {
    if (response.data.success == "New user has been created") {
      this.props.history.push("/");
    }
    else {
      this.setState({ authError: response })
    }
  }
  render() {
    return (
      <div className="signIn">
        <div className="row">
          <div className="col-sm-8">
            <div className="jumbotron">
              <form id="my_form">
                <div className="form-group">
                  <label >Email address</label>
                  <input type="email" className="form-control email" id="email" onChange={(e) => { this.setState({ email: e.target.value }) }} placeholder="cohenshay85@gmail.com" />
                </div>
                <div className="form-group">
                  <label >First Name</label>
                  <input type="text" className="form-control fname" id="fname" onChange={(e) => { this.setState({ fname: e.target.value }) }} placeholder="shay" />
                </div>
                <div className="form-group">
                  <label >Last Name</label>
                  <input type="text" className="form-control lname" id="lname" onChange={(e) => { this.setState({ lname: e.target.value }) }} placeholder="cohen" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" className="form-control phone" id="phone" onChange={(e) => { this.setState({ phone: e.target.value }) }} placeholder="972534296062" />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" className="form-control address" id="address" onChange={(e) => { this.setState({ address: e.target.value }) }} placeholder="hakesem 6" />
                </div>
                <div className="form-group">
                  <label>User Name</label>
                  <input type="text" className="form-control username" id="username" onChange={(e) => { this.setState({ username: e.target.value }) }} placeholder="cohenshay" />
                </div>
                <div className="form-group">
                  <label >Password</label>
                  <input type="password" className="form-control password" id="password" onChange={(e) => { this.setState({ password: e.target.value }) }} placeholder="1234" />
                </div>
                <button type="button" onClick={() => { this.props.signIn({email: this.state.email,
                                                                         password: this.state.password,
                                                                         email: this.state.email,
                                                                         fname: this.state.fname,
                                                                         lname: this.state.lname,
                                                                         phone:this.state.phone,
                                                                         address:this.state.address,
                                                                         username:this.state.username }, this.checkResponse) }} className="btn btn-primary">Submit</button>
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
  signIn: (params, callback) => dispatch(signIn(params, callback))
});

export default connect(undefined, mapDispatchToProps)(SignIn);
