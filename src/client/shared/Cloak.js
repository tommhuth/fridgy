import React, { Component } from "react"
import Icon, { IconType } from "../shared/Icon"

export default class Cloak extends Component {
    render() {
        let spinner = <div className="cloak">
            <Icon type={IconType.Refresh} />
            <span className="visually-hidden">Loading ...</span>
        </div>

        return (
            <div>
                {this.props.if ? spinner : this.props.children}
            </div>
        )
    }
} 