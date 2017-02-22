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
        let className = "button " + (this.props.className || "")
        return (
            <Link to={this.props.to}
                onClick={this.props.onClick}
                className={className}>
                <span className="inner"
                    onTocuhStart={this.setFocus.bind(this)}
                    onBlur={this.setBlur.bind(this)}>
                    {this.props.children}
                </span>
            </Link>
        )
    }
} 