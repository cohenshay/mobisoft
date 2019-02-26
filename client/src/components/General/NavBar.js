import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { logout } from '../../actions/auth';
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      menues: ["Home", "About", "Contact", "Chat"],
    };
  }
  toggleMenu = (menuName, status) => {
    var element = document.querySelector(".nav-expand");
    element.style.display = status == "open" ? "block" : "none";
  };
  render() {
    return (
      <div className="nav-wrapper">
        <div className="nav-status-bar">
          <ul className="nav-status-right_item-wrapper">
            {
              !this.props.isSigned &&
              <li className="nav-status-right_item">
                <Link to="/login">Login</Link>
              </li>            
            }
            {
              !this.props.isSigned &&
              <li className="nav-status-right_item">
                <Link to="/sign">Sign In</Link>
              </li>            
            }
            {
              this.props.isSigned &&
              <li className="nav-status-right_item pointer">
                <div onClick={() => this.props.logout()}>Logout</div>
              </li>
            }
          </ul>
          <ul className="nav-status-left_item-wrapper">
            <li className="nav-status-left_item">
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});
const mapStateToProps = (state, props) => ({
  isSigned: state.auth.currentUser!=null
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
