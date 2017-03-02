import React, { Component } from "react"
import { connect } from "react-redux"
import { attemptAuth } from "../data/store/actions/auth"

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tokenInput: ""
        }
    }
    handleTokenInputChange(e) {
        this.setState({ tokenInput: e.target.value })
    }
    attemptAuth(e) {
        e.preventDefault()
        this.props.attemptAuth(this.state.tokenInput)
    }
    render() {
        return (
            <form onSubmit={this.attemptAuth.bind(this)}>
                <fieldset className="login">
                    <legend className="visually-hidden">Login</legend>

                    <input value={this.state.tokenInput} onChange={this.handleTokenInputChange.bind(this)} />
                    <button>Login</button> 
                </fieldset>
            </form>

        )
    }
}

export default connect(
    (state) => {
        return {
            auth: state.auth
        }
    },
    (dispatch) => {
        return {
            attemptAuth: (token) => dispatch(attemptAuth(token)),
        }
    }
)(Login)