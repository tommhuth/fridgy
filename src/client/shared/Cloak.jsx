import React, { Component } from "react";
import Icon from "../shared/Icon";
    
class Cloak extends Component {
    render() {
        return (
            <div>
                <div className={"cloak-spinner " + (!this.props.state ? "hidden" : "")}>
                    <Icon title="refresh" />
                    <span className="visually-hidden">Loading ...</span>
                </div>
                <div className={"cloak-content " + (this.props.state ? "hidden" : "")}>
                    {!this.props.state ? this.props.children : null}
                </div>
            </div>
        )
    }
}

export default Cloak;