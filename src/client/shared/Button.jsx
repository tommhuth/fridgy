import React, { Component } from "react";
    
class Button extends Component {
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
                <button type="button" 
                        onClick={this.props.onClick} 
                        className={"button " + (this.props.className || "")}> 
                    <span className="inner">{this.props.children}</span>
                </button> 
        )
    }
}

export default Button;