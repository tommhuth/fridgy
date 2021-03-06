import React, { Component } from "react" 
import PropTypes from "prop-types"

export const IconType = {
    ArrowRight: "arrow-right",
    ArrowDown: "arrow-down",
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
    X: "x",
    ChickenDinner: "chicken-dinner"
}

const ViewBox = {
    [IconType.ArrowRight]: "58 31",
    [IconType.ArrowDown]: "31 58",
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
    [IconType.X]: "78 79",
    [IconType.ChickenDinner]: "77 61"
}

export default class Icon extends Component { 
    static propTypes = {
        type: PropTypes.string.isRequired
    }
    render() { 
        return (
            <svg key={this.id} className={"icon"} viewBox={`0 0 ${ViewBox[this.props.type] || "0 0"}`} >
                <use xlinkHref={ `/gfx/iconset.svg?v=${process.env.APP_VERSION}#${this.props.type}`} />
            </svg>
        )
    }
} 