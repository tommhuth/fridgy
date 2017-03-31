import React, { Component } from "react"

export default class Button extends Component {
    render() {
        return (
            <button
                type="button"
                ref={ref => this.ref = ref}
                onClick={this.props.onClick}
                className="button">
                <span className={"button__inner " + (this.props.isInverted ? "button__inner--inverted" : "")} >
                    {this.props.children}
                </span>
            </button>
        )
    }
} 