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
        let { to, onClick, className, children } = this.props

        return (
            <Link 
                to={to}
                onClick={onClick}
                className={"button " + className}>
                <span 
                    className={"button__inner"}
                    onTouchStart={this.setFocus.bind(this)}
                    onBlur={this.setBlur.bind(this)}>
                    {children}
                </span>
            </Link>
        )
    }
} 