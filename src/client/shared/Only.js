import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Only extends Component {
    static propTypes = {
        if: PropTypes.bool.isRequired
    }
    render() {
        return (
            <span>
                {this.props.if ? this.props.children : null}
            </span>
        )
    }
} 