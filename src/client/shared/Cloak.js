import React, { Component } from "react"
import Icon, {IconType} from "../shared/Icon"

export default class Cloak extends Component {
    render() {
        return (
            <div>
                <div className={"cloak-spinner " + (!this.props.if ? "hidden" : "")}>
                    <Icon type={IconType.Refresh} />
                    <span className="visually-hidden">Loading ...</span>
                </div>
                <div className={"cloak-content " + (this.props.if ? "hidden" : "")}> 
                    {!this.props.if ? this.props.children : null}
                </div>
            </div>
        )
    }
} 