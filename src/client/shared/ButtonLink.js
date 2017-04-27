import React, { Component } from "react"
import { Link } from "react-router"
import PropTypes from "prop-types"

export const ButtonStyle = {
    Inverted: "button--inverted"
}

export default class ButtonLink extends Component {
    static defaultProps = {
        className: ""
    }
    static propTypes = {
        onClick: PropTypes.func,
        to: PropTypes.string.isRequired
    }
    state = {
        hasFocus: false
    } 
    setFocus() {
        this.setState({
            hasFocus: true
        })
    }
    setBlur() {
        this.setState({
            hasFocus: false
        })
    }
    render() { 
        return (
            <Link 
                to={this.props.to}
                onClick={this.props.onClick}
                className={"button " + this.props.className}>
                <span 
                    className={"button__inner"}
                    onTouchStart={this.setFocus.bind(this)}
                    onBlur={this.setBlur.bind(this)}>
                    {this.props.children}
                </span>
            </Link>
        )
    }
} 