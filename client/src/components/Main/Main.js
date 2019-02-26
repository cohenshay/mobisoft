import React, { Component } from "react";
import { connect } from "react-redux";

class Main extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentDidMount = () => {
  }

  render() {
    return (

      <div className="main-content">
      
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  // getAllItems: () => { dispatch(getAllItems()); },
});
const mapStateToProps = (state, props) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
