import React, { Component } from "react";
import { Link } from "react-router";

class ButtonLink extends Component {
    constructor(props){
        super(props);

        this.state = {
            hasFocus: false
        }
    }
    setFocus(){
        this.setState({
            hasFocus: true
        })
    }
    removeFocus(){
        this.setState({
            hasFocus: false
        })
    }
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