import React, { Component } from "react"
import uuid from "node-uuid"

export const IconType = {
    ArrowRight: "arrow-right",
    CheckboxChecked: "checkbox-checked",
    CheckboxDefault: "checkbox-default",
    Checkmark: "checkmark",
    ChevronDown: "chevron-down",
    ChevronLeft: "chevron-left",
    ChevronRight: "chevron-right",
    ChevronUp: "chevron-up",
    Hamburger: "hamburger",
    Plus: "plus",
    Minus: "minus",
    RadiobuttonChecked: "radiobutton-checked",
    RadiobuttonDefault: "radiobutton-default",
    Refresh: "refresh",
    X: "x"
}

const ViewBox = {
    [IconType.ArrowRight]: "78 39",
    [IconType.CheckboxChecked]: "90 90",
    [IconType.CheckboxDefault]: "90 90",
    [IconType.RadiobuttonChecked]: "90 90",
    [IconType.RadiobuttonDefault]: "90 90",
    [IconType.Checkmark]: "78 57",
    [IconType.ChevronUp]: "78 78",
    [IconType.ChevronDown]: "78 78",
    [IconType.ChevronLeft]: "78 78",
    [IconType.ChevronRight]: "78 78",
    [IconType.Hamburger]: "78 41",
    [IconType.Plus]: "78 73",
    [IconType.Minus]: "78 5",
    [IconType.Refresh]: "78 73",
    [IconType.X]: "78 79"
}

export default class Icon extends Component {
    id = uuid.v1()

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
            <svg key={this.id} className={"icon " + (this.props.size || "")} viewBox={`0 0 ${ViewBox[this.props.type] || "0 0"}`} >
                <use xlinkHref={"/gfx/iconset.svg#" + this.props.type} />
            </svg>
        )
    }
} 