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
        return (
            <button
                type="button" 
                onClick={this.props.onClick}
                className={"button " + this.props.className}>
                <span className="button__inner">
                    {this.props.children}
                </span>
            </button>
        )
    }
} 