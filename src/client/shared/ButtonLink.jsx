import React, { Component } from "react";
import { Link } from "react-router";

class ButtonLink extends Component {
    render() {
        return (
                <Link to={this.props.to}
                      onClick={this.props.onClick}
                      className={"button " + (this.props.className || "")}>
                    <span className="inner">{this.props.children}</span>
                </Link> 
        )
    }
}

export default ButtonLink;