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
        let className = "button " + (this.state.hasFocus ? "button--focus" : "")
    
        return (
            <button 
                type="button"
                onClick={this.props.onClick}
                className={className}>
                <span 
                    className={"button__inner " + (this.props.isInverted ? "button__inner--inverted" : "")}
                    onTouchStart={this.setFocus.bind(this)}
                    onBlur={this.setBlur.bind(this)}>
                    {this.props.children}
                </span>
            </button>
        )
    }
} 