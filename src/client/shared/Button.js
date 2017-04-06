import React, { Component } from "react"

export const ButtonStyle = {
    Inverted: "button--inverted"
}

export default class Button extends Component {
    render() {
        return (
            <button
                type="button" 
                onClick={this.props.onClick}
                className={"button " + (this.props.style ? this.props.style : "")}>
                <span className="button__inner">
                    {this.props.children}
                </span>
            </button>
        )
    }
} 