import React, { Component } from "react" 

export default class Page extends Component {
    render() { 
        return (
            <div className={"page " + (this.props.className || "")}> 
                {this.props.children}
            </div>
        )
    }
} 