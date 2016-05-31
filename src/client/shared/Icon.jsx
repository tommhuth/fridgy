import React, {Component } from "react";
    
class Icon extends Component { 
    render() {
        return (
            <svg className={"icon " + (this.props.size || "") }  >
                <use xlinkHref={"/public/gfx/iconset.svg#" + this.props.title}  />
            </svg>
        )
    }
}



export default Icon;