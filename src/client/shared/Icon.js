import React, { Component } from "react"
import uuid from "node-uuid"

export default class Icon extends Component {
    constructor(props) {
        super(props)

        this.id = uuid.v1()
    }
    render() {
        /*
            Edge refuses to render svg properly on change (size is set to viewBox not 
            CSS size), this is a super dirty fix that forces rerender of elements, 
            suspect a mere change of attributes is not enough
        */
        if (/Edge\/\d./i.test(navigator.userAgent)) {
            this.id = uuid.v1()
        }

        return (
            <svg key={this.id} className={"icon " + (this.props.size || "")}  >
                <use xlinkHref={"/gfx/iconset.svg#" + this.props.title} />
            </svg>
        )
    }
} 