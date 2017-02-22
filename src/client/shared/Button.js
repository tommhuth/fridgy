import React, { Component } from "react"

export default class Button extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasFocus: false
        }
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
        let className = "button " + (this.state.hasFocus ? "has-focus" : "") + (this.props.className || "")
        return (
            <button type="button"
                onClick={this.props.onClick}
                className={className}>
                <span className="inner"
                    onTouchStart={this.setFocus.bind(this)}
                    onBlur={this.setBlur.bind(this)}>
                    {this.props.children}
                </span>
            </button>
        )
    }
} 