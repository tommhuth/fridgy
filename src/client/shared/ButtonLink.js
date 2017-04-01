import React, { Component } from "react"
import { Link } from "react-router"

export default class ButtonLink extends Component {
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
        return (
            <Link 
                to={this.props.to}
                onClick={this.props.onClick}
                className="button">
                <span 
                    className={"button__inner "}
                    onTouchStart={this.setFocus.bind(this)}
                    onBlur={this.setBlur.bind(this)}>
                    {this.props.children}
                </span>
            </Link>
        )
    }
} 