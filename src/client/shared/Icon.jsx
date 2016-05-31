import React, {Component } from "react";
    
class Icon extends Component { 
    render() {
        return (
            <svg className={"icon " + (this.props.size ? this.props.size : "") }  viewBox="0 0 100 100">
                <use xlinkHref={"public/gfx/iconset.svg#" + this.props.title}  />
            </svg>
        )
    }
}



export default Icon;