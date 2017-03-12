import React, { Component } from "react"

export default class Only extends Component {
    render() {
        return (
            <span>
                {this.props.if ? this.props.children : null}
            </span>
        )
    }
} 