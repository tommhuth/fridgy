import React, { Component } from "react";
    
class Button extends Component {
    render() {
        return ( 
                <button type="button" 
                        onClick={this.props.onClick} 
                        className={"button " + (this.props.className || "")}> 
                    <span className="inner">{this.props.children}</span>
                </button> 
        )
    }
}

export default Button;