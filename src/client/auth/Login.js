import React, { Component } from "react"
import { connect } from "react-redux"
import { attemptAuth } from "../data/store/actions/auth"
import Icon, { IconType } from "../shared/Icon"
import BodyClassName from "react-body-classname"

class Login extends Component {
    state = {
        tokenInput: ""
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
            <BodyClassName className="fill fill--gray">
                <form onSubmit={this.attemptAuth.bind(this)} action="" className="login">
                    <fieldset className={"login__wrapper " + (this.props.auth.error ? "login__wrapper--error" : "")}>
                        <div className="input-pair">
                            <legend className="visually-hidden">Login</legend>

                            <label className="visually-hidden" htmlFor="password-input">Password</label>
                            <input
                                className="input-pair__input"
                                autoComplete={false}
                                id="password-input"
                                value={this.state.tokenInput}
                                onChange={this.handleTokenInputChange.bind(this)}
                                type="password" />

                            <button className="input-pair__button">
                                <span className="visually-hidden">Login</span>
                                <Icon type={IconType.ArrowRight} />
                            </button>
                        </div>
                    </fieldset>
                </form>
            </BodyClassName>
        )
    }
}

export default connect(
    store => {
        return {
            auth: store.auth
        }
    },
    dispatch => {
        return {
            attemptAuth: (token) => dispatch(attemptAuth(token)),
        }
    }
)(Login)