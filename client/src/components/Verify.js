import React from 'react';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';


class Verify extends React.Component {
    constructor() {
        super();
        this.state = {
            pin: ""
        }
    }
    checkResponse = (response) => {
        if (response.data.status == "verified" && response.data.token) {
            this.props.history.push("/orders");
        }       
        else {
            this.setState({ authError: response })
        }
    }
    verify = () => {
        this.props.verify({ pin: this.state.pin, 'requestId': this.props.requestId, user: this.props.currentUser },this.checkResponse)
    }
    render() {
        return (
            <div className="login-main">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="jumbotron">
                            <div className="verify">
                                <input name="pin" required="" type="number" placeholder="1234" onChange={(e) => { this.setState({ pin: e.target.value }) }} />
                                <input type="button" value="Verify PIN" onClick={() => this.verify()} />
                            </div>
                            {this.state.authError && <div className="login-error">{`Login Error, status: ${this.state.authError.status}, message: ${this.state.authError.statusText}`}</div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, props) => ({
    requestId: state.auth.requestId,
    currentUser: state.auth.currentUser
});


const mapDispatchToProps = (dispatch) => ({
    verify: (params, callback) => dispatch(verify(params, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
