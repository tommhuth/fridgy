import React, { Component } from "react"
import PropTypes from "prop-types"

export const ButtonStyle = {
    Inverted: "button--inverted"
}

export default class Button extends Component {
    static defaultProps = {
        className: ""
    }
    static propTypes = {
        onClick: PropTypes.func,
        className: PropTypes.string
    }
    render() {
        let { onClick, className, children } = this.props
        return (
            <button
                type="button" 
                onClick={onClick}
                className={"button " + className}>
                <span className="button__inner">
                    {children}
                </span>
            </button>
        )
    }
} 