import React, { Component } from "react";
    
class Icon extends Component {  
    render() {
        /*
            Edge refuses to render svg properly on change (size is set to viewBox not 
            CSS size), this is a super dirty fix that forces rerender of elements, 
            suspect a mere change of attributes is not enough
        */
        let id = 0;

        if (/Edge\/\d./i.test(navigator.userAgent)){ 
            id = Math.round(Math.random() * 10000) * Date.now();
        }

        return (
            <svg  key={id} className={"icon " + (this.props.size || "") }  >
                <use xlinkHref={"/gfx/iconset.svg#" + this.props.title}  />
            </svg>
        )
    }
}

export default Icon;